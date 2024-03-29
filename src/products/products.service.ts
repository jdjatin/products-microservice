import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';


@Injectable()
export class ProductsService {

  constructor (
    private readonly prisma:PrismaService,
  ){}



  async create(data) {
    return await this.prisma.products.create({
      data:data
    });
  }

  findAll() {
    return this.prisma.products.findMany();
  }

  async findOne(id) {
    return await this.prisma.products.findUnique({
      where:{
        id:id
      }
    })
  }

  // update(id, data) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id) {
    return this.prisma.products.delete({
      where:{
        id:id
      }
    })
  }
}
