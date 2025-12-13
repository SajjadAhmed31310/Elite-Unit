import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string, type: string = 'all') {
    if (!query) return { users: [], posts: [] };

    const results: any = {};

    if (type === 'all' || type === 'user') {
      results.users = await (this.prisma as any).user.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { handle: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: { id: true, name: true, handle: true, avatar: true, bio: true }
      });
    }

    if (type === 'all' || type === 'post') {
      results.posts = await (this.prisma as any).post.findMany({
        where: {
          content: { contains: query, mode: 'insensitive' }
        },
        include: {
          author: { select: { id: true, name: true, handle: true, avatar: true } }
        },
        orderBy: { createdAt: 'desc' },
        take: 20
      });
    }

    return results;
  }
}
