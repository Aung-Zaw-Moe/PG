
import { Module } from '@nestjs/common';
import { HiringPostService } from './hiringpost.service';
import { HiringPostController } from './hiringpost.controller';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HiringPostController],
  providers: [HiringPostService],
})
export class HiringPostModule {}
