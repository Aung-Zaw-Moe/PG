import { Module } from '@nestjs/common';
import { JobtypeController } from './jobtype.controller';
import { JobtypeService } from './jobtype.service';

@Module({
  controllers: [JobtypeController],
  providers: [JobtypeService]
})
export class JobtypeModule {}
