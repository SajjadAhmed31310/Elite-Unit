import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestStatus } from '@prisma/client';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async sendRequest(senderId: string, receiverId: string) {
    if (senderId === receiverId) throw new BadRequestException("Cannot add yourself");

    // Check blocking
    const isBlocked = await (this.prisma as any).block.findFirst({
      where: {
        OR: [
          { blockerId: receiverId, blockedId: senderId },
          { blockerId: senderId, blockedId: receiverId }
        ]
      }
    });
    if (isBlocked) throw new ForbiddenException("Cannot perform this action");

    // Check existing request
    const existing = await (this.prisma as any).friendRequest.findFirst({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId }
        ]
      }
    });

    if (existing) {
      if (existing.status === RequestStatus.PENDING) throw new BadRequestException("Request already pending");
      if (existing.status === RequestStatus.ACCEPTED) throw new BadRequestException("Already friends");
      // If declined/cancelled previously, we might allow creating a new one. For now, update existing.
      return (this.prisma as any).friendRequest.update({
        where: { id: existing.id },
        data: { status: RequestStatus.PENDING, senderId, receiverId } // Reset sender in case roles reversed
      });
    }

    return (this.prisma as any).friendRequest.create({
      data: { senderId, receiverId, status: RequestStatus.PENDING }
    });
  }

  async getRequests(userId: string) {
    const received = await (this.prisma as any).friendRequest.findMany({
      where: { receiverId: userId, status: RequestStatus.PENDING },
      include: { sender: { select: { id: true, name: true, handle: true, avatar: true } } }
    });
    const sent = await (this.prisma as any).friendRequest.findMany({
      where: { senderId: userId, status: RequestStatus.PENDING },
      include: { receiver: { select: { id: true, name: true, handle: true, avatar: true } } }
    });
    return { received, sent };
  }

  async acceptRequest(userId: string, requestId: string) {
    const req = await (this.prisma as any).friendRequest.findUnique({ where: { id: requestId } });
    if (!req || req.receiverId !== userId || req.status !== RequestStatus.PENDING) {
      throw new BadRequestException("Invalid request");
    }

    // Transaction: Update Request -> Create Friendships (Bidirectional)
    await (this.prisma as any).$transaction([
      (this.prisma as any).friendRequest.update({
        where: { id: requestId },
        data: { status: RequestStatus.ACCEPTED }
      }),
      (this.prisma as any).friendship.create({ data: { userId: req.senderId, friendId: req.receiverId } }),
      (this.prisma as any).friendship.create({ data: { userId: req.receiverId, friendId: req.senderId } }),
    ]);

    return { message: "Friendship accepted" };
  }

  async declineRequest(userId: string, requestId: string) {
    const req = await (this.prisma as any).friendRequest.findUnique({ where: { id: requestId } });
    if (!req || req.receiverId !== userId) throw new BadRequestException("Invalid request");

    await (this.prisma as any).friendRequest.update({
      where: { id: requestId },
      data: { status: RequestStatus.DECLINED }
    });
    return { message: "Request declined" };
  }

  async cancelRequest(userId: string, requestId: string) {
    const req = await (this.prisma as any).friendRequest.findUnique({ where: { id: requestId } });
    if (!req || req.senderId !== userId) throw new BadRequestException("Invalid request");

    await (this.prisma as any).friendRequest.update({
      where: { id: requestId },
      data: { status: RequestStatus.CANCELLED }
    });
    return { message: "Request cancelled" };
  }

  async getFriendsList(identifier: string) {
    // If it looks like a UUID, search by ID, else by handle
    let user = null;
    if (identifier.includes('@')) {
       user = await (this.prisma as any).user.findUnique({ where: { handle: identifier } });
    } else {
       // Assume ID if no @, or verify UUID format. For simplicity assume ID or handle without @ is vague, checking ID first
       user = await (this.prisma as any).user.findUnique({ where: { id: identifier } });
       if (!user) user = await (this.prisma as any).user.findUnique({ where: { handle: identifier } });
    }
    
    if (!user) throw new NotFoundException("User not found");

    const friends = await (this.prisma as any).friendship.findMany({
      where: { userId: user.id },
      include: { friend: { select: { id: true, name: true, handle: true, avatar: true } } }
    });
    return friends.map(f => f.friend);
  }

  async unfriend(userId: string, friendId: string) {
    // Delete both records
    await (this.prisma as any).friendship.deleteMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId }
        ]
      }
    });
    
    // Also remove any accepted request to allow new requests cleanly
    await (this.prisma as any).friendRequest.deleteMany({
      where: {
        OR: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId }
        ]
      }
    });

    return { message: "Unfriended" };
  }

  async blockUser(blockerId: string, blockedId: string) {
    if (blockerId === blockedId) throw new BadRequestException("Cannot block yourself");

    // Unfriend first if friends
    await this.unfriend(blockerId, blockedId);

    // Create block
    await (this.prisma as any).block.create({
      data: { blockerId, blockedId }
    });

    return { message: "User blocked" };
  }

  async unblockUser(blockerId: string, blockedId: string) {
    await (this.prisma as any).block.deleteMany({
      where: { blockerId, blockedId }
    });
    return { message: "User unblocked" };
  }
}