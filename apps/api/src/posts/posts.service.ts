import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: { content: string; images?: string[]; audience?: string }) {
    return (this.prisma as any).post.create({
      data: {
        content: dto.content,
        images: dto.images || [],
        audience: dto.audience || 'PUBLIC',
        authorId: userId,
      },
    });
  }

  async getFeed(userId: string, cursor?: string, limit: number = 10) {
    // Get list of friends
    const friendships = await (this.prisma as any).friendship.findMany({
      where: { userId },
      select: { friendId: true }
    });
    const friendIds = friendships.map(f => f.friendId);
    
    // Include self
    const allowedAuthors = [...friendIds, userId];

    const posts = await (this.prisma as any).post.findMany({
      where: {
        authorId: { in: allowedAuthors }
      },
      take: limit + 1, // Fetch one extra to check for next page
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, name: true, handle: true, avatar: true } },
        _count: { select: { comments: true, likes: true } },
        likes: { where: { userId }, select: { userId: true } } // To check if current user liked
      }
    });

    let nextCursor = null;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem.id;
    }

    return {
      data: posts.map(post => ({
        ...post,
        isLiked: post.likes.length > 0
      })),
      nextCursor
    };
  }

  async findOne(id: string) {
    const post = await (this.prisma as any).post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, handle: true, avatar: true } },
        comments: {
           include: { author: { select: { id: true, name: true, handle: true, avatar: true } } },
           orderBy: { createdAt: 'asc' }
        },
        _count: { select: { likes: true } }
      }
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(userId: string, id: string, dto: any) {
    const post = await (this.prisma as any).post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId) throw new ForbiddenException('Not authorized');

    return (this.prisma as any).post.update({
      where: { id },
      data: dto
    });
  }

  async remove(userId: string, id: string) {
    const post = await (this.prisma as any).post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId) throw new ForbiddenException('Not authorized');

    return (this.prisma as any).post.delete({ where: { id } });
  }
}
