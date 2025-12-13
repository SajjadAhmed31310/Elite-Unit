import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AppGateway } from '../gateway/app.gateway';
import { NotificationType } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
    private gateway: AppGateway
  ) {}

  async sendMessage(senderId: string, recipientId: string, content: string) {
    if (senderId === recipientId) throw new BadRequestException('Cannot message yourself');

    // Check blocking
    const isBlocked = await (this.prisma as any).block.findFirst({
      where: {
        OR: [
            { blockerId: recipientId, blockedId: senderId },
            { blockerId: senderId, blockedId: recipientId }
        ]
      }
    });
    if (isBlocked) throw new ForbiddenException('Cannot send message');

    // Find or create conversation
    // Ideally use findFirst where participants has every [senderId, recipientId]
    // Prisma simple relation filtering is tricky for "exact match of arrays", so we check existing manually or simplify
    let conversation = await (this.prisma as any).conversation.findFirst({
        where: {
            AND: [
                { participants: { some: { id: senderId } } },
                { participants: { some: { id: recipientId } } }
            ]
        }
    });

    if (!conversation) {
        conversation = await (this.prisma as any).conversation.create({
            data: {
                participants: {
                    connect: [{ id: senderId }, { id: recipientId }]
                }
            }
        });
    }

    const message = await (this.prisma as any).message.create({
        data: {
            content,
            conversationId: conversation.id,
            senderId
        },
        include: {
            sender: { select: { id: true, name: true, avatar: true } }
        }
    });

    // Realtime event
    this.gateway.sendToUser(recipientId, 'message:new', message);

    // Notification
    await this.notifications.create({
        recipientId,
        senderId,
        type: NotificationType.MESSAGE_RECEIVED,
        content: `sent you a message: ${content.substring(0, 30)}...`,
        resourceId: conversation.id
    });

    return message;
  }

  async getConversations(userId: string) {
      return (this.prisma as any).conversation.findMany({
          where: {
              participants: { some: { id: userId } }
          },
          include: {
              participants: {
                  where: { id: { not: userId } },
                  select: { id: true, name: true, avatar: true }
              },
              messages: {
                  orderBy: { createdAt: 'desc' },
                  take: 1
              }
          },
          orderBy: { updatedAt: 'desc' }
      });
  }

  async getMessages(userId: string, conversationId: string) {
      const conversation = await (this.prisma as any).conversation.findUnique({
          where: { id: conversationId },
          include: { participants: { select: { id: true } } }
      });
      
      if (!conversation || !conversation.participants.some(p => p.id === userId)) {
          throw new NotFoundException('Conversation not found');
      }

      return (this.prisma as any).message.findMany({
          where: { conversationId },
          orderBy: { createdAt: 'asc' },
          include: { sender: { select: { id: true, name: true, avatar: true } } }
      });
  }
}
