import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerInit(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:5173',
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Authorization',
    ],
    exposedHeaders: ['Authorization'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();

function swaggerInit(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Progress Pulse')
    .setDescription('The ProgressPulse API description')
    .setVersion('1.0')
    .addTag('Yoda')
    .addTag('Jedi')
    .addTag('Padawan')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
