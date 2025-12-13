import { Controller, Post, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('likes')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId')
  like(@Req() req, @Param('postId') postId: string) {
    return this.likesService.toggleLike(req.user.sub, postId);
  }
}
