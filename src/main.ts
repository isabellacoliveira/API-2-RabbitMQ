import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // informar que a validação ocorrerá de forma global
  // se eu mandar um campo a mais que não faça parte da validação, ele vai ser removido (por isso o whitelist)
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      // validação vai funcionar apenas quando pertencente a um grupo
      transformOptions: { groups: ['transform'] },
    }),
  );
  await app.listen(3000);
}
bootstrap();
