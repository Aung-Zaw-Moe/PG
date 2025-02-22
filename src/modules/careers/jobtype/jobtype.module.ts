import { Module } from '@nestjs/common';
import { JobTypeService } from './jobtype.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JobTypeController } from './jobtype.controller';

@Module({
  imports: [PrismaModule],
  providers: [JobTypeService],
  controllers: [JobTypeController],
})
export class JobTypeModule {}
