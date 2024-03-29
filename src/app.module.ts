import { Module } from '@nestjs/common';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductsModule } from './products/products.module';
import { PaymentModule } from './payment/payment.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ProductCategoryModule, ProductsModule, PaymentModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
