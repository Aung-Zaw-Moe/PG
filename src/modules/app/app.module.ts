import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from 'src/modules/careers/category/category.module';
import { JobTypeModule } from 'src/modules/careers/jobtype/jobtype.module';
import { HiringPostModule } from 'src/modules/careers/hiringpost/hiringpost.module';
import { LocationModule } from 'src/modules/careers/location/location.module';
import { ApplyNowModule } from 'src/modules/careers/applynow/applynow.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public/storage/uploads'),
    }),CategoryModule, JobTypeModule, HiringPostModule, LocationModule, ApplyNowModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
