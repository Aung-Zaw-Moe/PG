import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/careers/category/category.module';
import { JobtypeModule } from './modules/careers/jobtype/jobtype.module';
import { HiringpostModule } from './modules/careers/hiringpost/hiringpost.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public/storage/uploads'),
    }),CategoryModule, JobtypeModule, HiringpostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
