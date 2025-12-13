import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('cleanup')
export class CleanupProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(`Processing job ${job.id} of type ${job.name}`);
    // Simulate cleanup logic
    if (job.name === 'purge_old_notifications') {
        console.log('Purging old notifications...');
    }
    return {};
  }
}
