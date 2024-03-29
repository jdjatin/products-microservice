import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Import your PrismaService

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCartByuserId(userId) {
    return this.prisma.cart.findUnique({
      where: { user_id:userId },
      include: { items: true },
    });
  }

  async addToCart(data) {
    // Check if the cart exists
    let cart = await this.prisma.cart.findUnique({ where: { user_id:data.user_id } });
    if (!cart) {
      cart = await this.prisma.cart.create({
        data:  data.user_id ,
      });
    }
    // Check if the product is already in the cart
    const item = await this.prisma.cartItem.findUnique({
      where: {
        cart_id_product_id: { cart_id: cart.id, product_id:data.product_id },
      },
    });
    if (item) {
      // If it exists, update the quantity
      return this.prisma.cartItem.update({
        where: { id: item.id },
        data: { quantity: { increment: data.quantity } },
      });
    } else {
      // If not, add a new item
      return this.prisma.cartItem.create({
        data: {
          cart_id: data.cart_id,
          product_id:data.product_id,
          quantity:data.quantity,
        },
      });
    }
  }

  async removeFromCart(data) {
    const cart = await this.prisma.cart.findUnique({ where: { user_id:data.user_id } });
    if (!cart) {
      throw new Error('Cart not found');
    }
    return this.prisma.cartItem.deleteMany({
      where: { cart_id: cart.id, product_id:data.product_id },
    });
  }

  async updateCartItem(data) {
    const cart = await this.prisma.cart.findUnique({ where: {user_id: data.user_id } });
    if (!cart) {
      throw new Error('Cart not found');
    }
    return this.prisma.cartItem.updateMany({
      where: { cart_id: cart.id,product_id: data.product_id },
      data: {quantity: data.quantity },
    });
  }
}
