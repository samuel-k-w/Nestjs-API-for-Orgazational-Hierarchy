import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig, swaggerOptions } from './swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '100mb' }));

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (_, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('api', app, document, swaggerOptions);

  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const PORT = process.env.PORT || 3333;
  await app.listen(PORT, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();
