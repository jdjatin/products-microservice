import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsMessageService } from '../products.message.service';
import { PrismaService } from '../prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({  imports: [
  ClientsModule.register([{
    name:'PRODUCTS_CLIENT',
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port:4003
    }
  }])
],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService,ProductsMessageService] 
  // exports:[ProductsMessageService]
})
export class ProductsModule {}
