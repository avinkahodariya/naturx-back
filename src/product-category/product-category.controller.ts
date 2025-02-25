import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductCategoryService } from './product-category.service';
import {
  CreateProductCategoryDTO,
  UpdateProductCategoryDTO,
} from './dto/product-category';

@ApiBearerAuth()
@Controller('product-category')
@ApiTags('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategory: ProductCategoryService) {}

  @Post('create')
  @HttpCode(201)
  async createProductCategory(
    @Body() createProductCategoryDTO: CreateProductCategoryDTO,
  ): Promise<void> {
    return this.productCategory.createProductCategory(createProductCategoryDTO);
  }

  @Get('')
  @HttpCode(200)
  async get(@Query() params: any): Promise<any> {
    return this.productCategory.get(params);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<any> {
    return this.productCategory.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): Promise<void> {
    return this.productCategory.update(id, updateProductCategoryDTO);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<void> {
    return this.productCategory.delete(id);
  }
}
