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
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductsDTO, UpdateProductsDTO } from './dto/products';
import { SearchParamsDTO } from '@app/schema';

@ApiBearerAuth()
@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @HttpCode(201)
  async createProducts(
    @Body() createProductsDTO: CreateProductsDTO,
    @Req() req,
  ): Promise<void> {
    return this.productsService.createProducts(createProductsDTO, req.user);
  }

  @Get('')
  @HttpCode(200)
  async get(@Query() params: SearchParamsDTO): Promise<any> {
    return this.productsService.get(params);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<any> {
    return this.productsService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateProductsDTO: UpdateProductsDTO,
  ): Promise<void> {
    return this.productsService.update(id, updateProductsDTO);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<void> {
    return this.productsService.delete(id);
  }
}
