import { Controller, Post, Get, Delete, Param, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('friends/requests/:userId')
  async sendRequest(@Req() req, @Param('userId') receiverId: string) {
    return this.friendsService.sendRequest(req.user.sub, receiverId);
  }

  @Get('friends/requests')
  async getRequests(@Req() req) {
    return this.friendsService.getRequests(req.user.sub);
  }

  @Post('friends/requests/:requestId/accept')
  async acceptRequest(@Req() req, @Param('requestId') requestId: string) {
    return this.friendsService.acceptRequest(req.user.sub, requestId);
  }

  @Post('friends/requests/:requestId/decline')
  async declineRequest(@Req() req, @Param('requestId') requestId: string) {
    return this.friendsService.declineRequest(req.user.sub, requestId);
  }
  
  @Post('friends/requests/:requestId/cancel')
  async cancelRequest(@Req() req, @Param('requestId') requestId: string) {
    return this.friendsService.cancelRequest(req.user.sub, requestId);
  }

  @Get('friends/list/:username')
  async getFriends(@Req() req, @Param('username') username: string) {
    // If username is 'me', use current user
    const target = username === 'me' ? req.user.sub : undefined; 
    // Logic to find by username if not me would go here, simplified to ID for now or implement lookup in service
    // For MVP, if username is passed, we resolve it in service
    return this.friendsService.getFriendsList(target || username); 
  }

  @Delete('friends/:userId')
  async unfriend(@Req() req, @Param('userId') friendId: string) {
    return this.friendsService.unfriend(req.user.sub, friendId);
  }

  @Post('users/:id/block')
  async blockUser(@Req() req, @Param('id') blockedId: string) {
    return this.friendsService.blockUser(req.user.sub, blockedId);
  }

  @Delete('users/:id/block')
  async unblockUser(@Req() req, @Param('id') blockedId: string) {
    return this.friendsService.unblockUser(req.user.sub, blockedId);
  }
}
