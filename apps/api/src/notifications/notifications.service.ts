import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppGateway } from '../gateway/app.gateway';
import { NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private gateway: AppGateway
  ) {}

  async create(data: { recipientId: string; senderId?: string; type: NotificationType; content?: string; resourceId?: string }) {
    if (data.recipientId === data.senderId) return; // Don't notify self

    const notification = await (this.prisma as any).notification.create({
      data: {
        recipientId: data.recipientId,
        senderId: data.senderId,
        type: data.type,
        content: data.content,
        resourceId: data.resourceId
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } }
      }
    });

    this.gateway.sendToUser(data.recipientId, 'notification:new', notification);
    return notification;
  }

  async findAll(userId: string) {
    return (this.prisma as any).notification.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: { id: true, name: true, avatar: true } }
      },
      take: 50
    });
  }

  async markAsRead(userId: string, id: string) {
    return (this.prisma as any).notification.update({
      where: { id },
      data: { isRead: true }
    });
  }
}
