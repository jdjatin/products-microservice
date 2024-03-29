import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { PrismaService } from '../prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsMessageService } from '../products.message.service'; 

@Module({
  imports: [
    ClientsModule.register([{
      name:'PRODUCTS_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port:4003
      }
    }])
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, PrismaService,ProductsMessageService],
})
export class ProductCategoryModule {}
