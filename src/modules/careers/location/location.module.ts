import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { LocationController } from './location.controller';

@Module({
  imports: [PrismaModule],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
