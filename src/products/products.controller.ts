import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({purpose:'createProduct'})
  create(@Payload() data ) {
    return this.productsService.create(data);
  }

  @MessagePattern({purpose:'findAllProducts'})
  findAll(data) {
    return this.productsService.findAll();
  }

  @MessagePattern({purpose:'findOneProduct'})
  findOne(@Payload() id) {
    return this.productsService.findOne(id);
  }

  // @MessagePattern('updateProduct')
  // update(@Payload() data ) {
  //   return this.productsService.update(data.id, updateProductDto);
  // }

  @MessagePattern({purpose:"removeProduct"})
  remove(@Payload() id) {
    return this.productsService.remove(id);
  }
  
}
