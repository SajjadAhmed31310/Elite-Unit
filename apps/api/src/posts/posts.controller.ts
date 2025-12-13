import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createPostDto: { content: string; images?: string[]; audience?: string }) {
    return this.postsService.create(req.user.sub, createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('feed')
  getFeed(
    @Req() req, 
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string
  ) {
    return this.postsService.getFeed(req.user.sub, cursor, limit ? parseInt(limit) : 10);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updatePostDto: { content?: string; audience?: string }) {
    return this.postsService.update(req.user.sub, id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.postsService.remove(req.user.sub, id);
  }
}
