// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
//   app.setGlobalPrefix('api'); //biar ke set di API/../.. semua
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix semua route pakai /api
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('Server running on http://localhost:3000/api');
}
bootstrap();
