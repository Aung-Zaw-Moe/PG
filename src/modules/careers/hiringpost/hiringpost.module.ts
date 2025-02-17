import { Module } from '@nestjs/common';
import { HiringpostController } from './hiringpost.controller';
import { HiringpostService } from './hiringpost.service';

@Module({
  controllers: [HiringpostController],
  providers: [HiringpostService]
})
export class HiringpostModule {}
