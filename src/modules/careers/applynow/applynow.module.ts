import { Module } from '@nestjs/common';
import { ApplyNowService } from './applynow.service';
import { ApplyNowController } from './applynow.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ApplyNowController],
  providers: [ApplyNowService],
})
export class ApplyNowModule {}
