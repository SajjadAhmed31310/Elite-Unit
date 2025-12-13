import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  sendMessage(@Req() req, @Body() body: { recipientId: string; content: string }) {
    return this.messagesService.sendMessage(req.user.sub, body.recipientId, body.content);
  }

  @Get('conversations')
  getConversations(@Req() req) {
    return this.messagesService.getConversations(req.user.sub);
  }

  @Get('conversations/:id')
  getMessages(@Req() req, @Param('id') conversationId: string) {
    return this.messagesService.getMessages(req.user.sub, conversationId);
  }
}
