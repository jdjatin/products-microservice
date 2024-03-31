import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';


@Injectable()
export class ProductsService {

  constructor (
    private readonly prisma:PrismaService,
  ){}



  async create(data) {
    console.log(data)
    return await this.prisma.products.create({
      data:data,
      include:{
        category:true
      }
    });
  }

  findAll() {
    return this.prisma.products.findMany( { include:{
      category:true
    }});
  }

  async findOne(id) {
    return await this.prisma.products.findUnique({
      where:{
        id:id
      },
      include:{
        category:true
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
      },
      include:{
        category:true
      }
    })
  }
}
