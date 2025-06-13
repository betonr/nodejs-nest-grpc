import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Catalog Service');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  logger.log('Catalog REST API is running on port 3000');
}
void bootstrap();
