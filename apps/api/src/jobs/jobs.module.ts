import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CleanupProcessor } from './cleanup.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'cleanup',
    }),
  ],
  providers: [CleanupProcessor],
})
export class JobsModule {}
