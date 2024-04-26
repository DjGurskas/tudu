import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use(cors());
  app.use(bodyParser.json());

  const config = new DocumentBuilder()
  .setTitle('Tudu API')
  .setDescription('The Tudu API description')
  .addBearerAuth()
  .addTag('auth')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port).then(() => {
    console.log(`Application is running on: ${port}`);
  });
}
bootstrap();
