import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import * as packageJson from '../package.json';

import config from './common/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    snapshot: true
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Barcagest API')
    .setDescription('The Barcagest API')
    .setVersion(packageJson.version)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.server.port, config.server.hostname);
}
bootstrap();
