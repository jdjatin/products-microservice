import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import Razorpay from 'razorpay';
const Razorpay = require('razorpay');


@Injectable()
export class PaymentService {

    constructor(
        private readonly prisma:PrismaService
    ){}


    async createDeposit(data) {
        try {
            console.log(data)
            const deposit = await this.prisma.transactions.create(
              {
                data:data
              }
            );
            return deposit;
        } catch (error) {
            throw error;
        }

      }

      
    async createPaymentOrder(payloadData) {

    
        try {
            const razorpay = new Razorpay({
                key_id: process.env.KEY_ID,
                key_secret: process.env.KEY_SECRET,
              });
          const amount  = payloadData.paymentData.amount;
          const multipliedAmount = amount * 100;
          console.log(multipliedAmount)
          const res = await razorpay.paymentLink.create({
            amount: multipliedAmount,
            currency: 'CAD',
            callback_method: "get",
            callback_url: `${process.env.URL}/payment-confirmation`,
            description: 'For XYZ purpose',
            customer: {
              name: 'Jatin',
              email: 'jatin@example.com',
              contact: '+179000090000',
            },
            notify: { sms: true, email: true },
            reminder_enable: true,
            options: { checkout: { method: { netbanking: 1, card: 1, upi: 0, wallet: 0 } } },
          });
          console.log("res------>>", res);
    
          const data = {
            amount: res.amount,
            user_id: payloadData.user_id.userId,
            transaction_id: res.id,
            status: 'pending',
          };
    
          const savedData = await this.createDeposit(data);
          console.log(savedData)
          return res.short_url;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    
    
      async paymentConfirmation(webhookData) {
        try {
          console.log("Start");
          const data = await webhookData;
          console.log("Before destructuring");
          const payload = data.payload;
          const event = data.event;
          console.log("After destructuring");
          // const { event, payload } = await data;
          console.log('1st statement')
          const webhook_id = payload.payment_link.entity.id;
          console.log('2nd statement')
          const status = event === 'payment_link.paid' ? 'completed' : 'failed';
          console.log('1st statement')
          const dbUpdate = await this.prisma.transactions.update({
            where: {
              transaction_id: webhook_id, 
            },
            data: {
              payload: payload, 
              status: status,
            },
          });
          console.log('3rd statement')
          return `Transaction updated with ID - ${dbUpdate.id}`;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

}
