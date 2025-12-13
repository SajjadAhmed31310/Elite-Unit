import { Global, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from '../prisma/prisma.service';
import { GatewayModule } from '../gateway/gateway.module';
import { JwtService } from '@nestjs/jwt';

@Global() // Global so other services can inject NotificationsService easily
@Module({
  imports: [GatewayModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService, JwtService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
