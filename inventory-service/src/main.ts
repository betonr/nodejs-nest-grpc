import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Inventory Service');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'inventory',
        protoPath: join(__dirname, 'proto/inventory.proto'),
        url: '0.0.0.0:50051',
      },
    },
  );

  await app.listen();
  logger.log('Inventory gRPC service is running on port 50051');
}
void bootstrap();
