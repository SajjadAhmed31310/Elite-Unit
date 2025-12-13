import { Controller, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId')
  create(@Req() req, @Param('postId') postId: string, @Body('content') content: string) {
    return this.commentsService.create(req.user.sub, postId, content);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body('content') content: string) {
    return this.commentsService.update(req.user.sub, id, content);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.commentsService.remove(req.user.sub, id);
  }
}
