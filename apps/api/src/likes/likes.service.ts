import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async toggleLike(userId: string, postId: string) {
    const existing = await (this.prisma as any).like.findUnique({
      where: {
        postId_userId: { postId, userId }
      }
    });

    if (existing) {
      await (this.prisma as any).like.delete({
        where: { id: existing.id }
      });
      return { liked: false };
    } else {
      await (this.prisma as any).like.create({
        data: { postId, userId }
      });
      return { liked: true };
    }
  }
}
