import { nestOtelSDK } from './otel-instrumentation';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  await nestOtelSDK.start();
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  const options = new DocumentBuilder()
    .setTitle('Antifraud')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3002);
}
bootstrap();
