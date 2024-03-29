import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}



  @MessagePattern({purpose:"createPayment"})
  async initializePayment(data){
    try {
      console.log(data)
      return await this.paymentService.createPaymentOrder(data)
    } catch (error) {
      throw error;
    }

  }


  @MessagePattern({purpose:"verifyPayment"})
  async verifyPayment(webhookData){
    return await this.paymentService.paymentConfirmation(webhookData)
  }




}
