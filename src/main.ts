import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './database/filters/mongoExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Documentation
  const config = new DocumentBuilder()
    .setTitle('API Betterware 2')
    .setDescription('Betterware Inventario')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Globals
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Esta opcion ignorar y retirar los campos que no esten en el dto,
      forbidNonWhitelisted: true, // Se encarga de mandar un error al cliente
    }),
  );
  // app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(3000);
}
bootstrap();
