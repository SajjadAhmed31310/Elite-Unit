import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, postId: string, content: string) {
    return (this.prisma as any).comment.create({
      data: {
        content,
        postId,
        authorId: userId
      },
      include: {
        author: { select: { id: true, name: true, handle: true, avatar: true } }
      }
    });
  }

  async update(userId: string, id: string, content: string) {
    const comment = await (this.prisma as any).comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== userId) throw new ForbiddenException('Not authorized');

    return (this.prisma as any).comment.update({
      where: { id },
      data: { content }
    });
  }

  async remove(userId: string, id: string) {
    const comment = await (this.prisma as any).comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    // Allow post author to delete comments too? For now only comment author.
    if (comment.authorId !== userId) throw new ForbiddenException('Not authorized');

    return (this.prisma as any).comment.delete({ where: { id } });
  }
}
