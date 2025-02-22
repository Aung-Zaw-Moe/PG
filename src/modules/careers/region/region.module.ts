// src/modules/careers/region/region.module.ts
import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}