import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    // @MessagePattern({ purpose: 'createProduct' })
    // async addToCart(data: any) {
    //   try {
    //     // Logic to add a product to the cart
    //     const result = await this.cartService.addToCart(data);
    //     return result;
    //   } catch (error) {
    //     return { response: true, message: error.message, status: error.status || 500 };
    //   }
    // }
  
    // @MessagePattern({ purpose: 'findOneProduct' })
    // async getCartByUserId(data: any) {
    //   try {
    //     // Logic to get cart by user ID
    //     const result = await this.cartService.getCartByuserId(data.userId);
    //     return result;
    //   } catch (error) {
    //     return { response: true, message: error.message, status: error.status || 500 };
    //   }
    // }
  
    // @MessagePattern({ purpose: 'updateProduct' })
    // async updateCartItem(data: any) {
    //   try {
    //     // Logic to update a cart item
    //     const result = await this.cartService.updateCartItem(data);
    //     return result;
    //   } catch (error) {
    //     return { response: true, message: error.message, status: error.status || 500 };
    //   }
    // }
  
    // @MessagePattern({ purpose: 'removeProduct' })
    // async removeFromCart(data: any) {
    //   try {
    //     // Logic to remove a product from the cart
    //     const result = await this.cartService.removeFromCart(data);
    //     return result;
    //   } catch (error) {
    //     return { response: true, message: error.message, status: error.status || 500 };
    //   }
    // }
}
