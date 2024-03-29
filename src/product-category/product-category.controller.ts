import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, UseGuards } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}


  @MessagePattern({purpose:"findAllCategory"})
  async findAll(data) {
    const result =  await this.productCategoryService.findAll();
    // const responseData = result.map(category => ({
    //   id: Number(category.id),
    //   title: category.title,
    //   parent_id: category.parent_id ? Number(category.parent_id) : null,
    // }));
  
    return result;
    
  }
  
  
  
  // @Get('list-categories-public')
  // async findAllPublic() {
  //   const result =  await this.productCategoryService.findAll();
  //   // const responseData = result.map(category => ({
  //   //   id: Number(category.id),
  //   //   title: category.title,
  //   //   parent_id: category.parent_id ? Number(category.parent_id) : null,
  //   // }));
  
  //   return result;
    
  // }
  

  @MessagePattern({purpose:"findOneCategory"})
  async findOne(data) {
    
    const category =  await this.productCategoryService.findOne(data);
    if (!category) {
      throw new NotFoundException(`Category with ID ${data} not found`);
    }
  
    // // Convert the BigInt to a number
    // const { title, parent_id } = category;
    // const responseData = {
    //   id,
    //   title,
    //   parent_id: parent_id ? Number(parent_id) : null,
    // };
  
    return category;
  }
  

  @MessagePattern({purpose:"createCategory"})
  async create(@Body() data:any) {
  const result = await this.productCategoryService.create(data);
  // const { id, title, parent_id } = result;
      // const responseData = {
      //   id: Number(id),
      //   title,
      //   parent_id: parent_id ? Number(parent_id) : null,
      // };
  
      return result;
  }
  

  // async update(data: any) {
  // //   const updatedCategory = await this.productCategoryService.update(data);
  // //   // return {
  // //   //   id: Number(updatedCategory.id),
  // //   //   title: updatedCategory.title,
  // //   //   parent_id: updatedCategory.parent_id ? Number(updatedCategory.parent_id) : null,
  // //   // };
  // //   return updatedCategory;
  // }
  

  @MessagePattern({purpose:"removeCategory"})
  async remove(id: string) {
    console.log(id)
    return await this.productCategoryService.remove(id);
  
  }
}
