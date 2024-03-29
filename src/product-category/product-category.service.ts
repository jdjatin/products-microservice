import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class ProductCategoryService {
    constructor(private readonly pService: PrismaService, ){}

    async findAll(){
        const res =  this.pService.product_category.findMany({where:{
          isDeleted:false
        }});
        return (await res).map((category)=>({
          id:category.id,
          title:category.title,
          parent_id:category.parent_id
        }))
      }
    
      async findOne(id){
        const category =  await this.pService.product_category.findUnique({
          where: { id, isDeleted:false } ,
        });

        if(!category) {
          return "No record found!!"
        }

        return {
          id:category.id,
          title:category.title,
          parent_id:category.parent_id
        }
      }
    
      async create(data){
        return this.pService.product_category.create({
          data:{
            title:data.title,
            parent_id:data?.parent_id
          }
        });
      }
    
      async update(id, data){
        return this.pService.product_category.update({
          where: { id },
          data,
        });
      }
    
      async remove(id) {
        try {
          const record = await this.pService.product_category.findUnique({
            where: {id}
          });
          console.log(record);
  
          const dependentRecords = await this.pService.product_category.findMany({
            where: {
              id:record.parent_id
              
            },
          });
        console.log(dependentRecords)
          if (dependentRecords.length === 0) {
            await this.pService.product_category.update({
              where: { id },
              data:{
                isDeleted:true
              }
            });
        
            return "Record deleted successfully.";
          } else {
            return "This record can't be deleted! Please check for dependent records.";
          }
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
           
            console.log("catch block")
            return "This record can't be deleted! Please check for experiences records.";
          } else {
            // Handle other errors or rethrow them
            throw error;
          }
        }
        
      }

}