import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Passion Geek Portfolio API')
    .setDescription('API documentation for CMS system from Aung Zaw Moe')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Handle file uploads limit
  app.use(express.json({ limit: '1024mb' }));
  app.use(express.urlencoded({ limit: '1024mb', extended: true }));


  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
