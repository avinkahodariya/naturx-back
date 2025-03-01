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
import { CustomerSourceService } from './customer-source.service';
import {
  CreateCustomerSourceDTO,
  UpdateCustomerSourceDTO,
} from './dto/customer-source';
import { SearchParamsDTO } from '@app/schema';

@ApiBearerAuth()
@Controller('customer-source')
@ApiTags('customer-source')
export class CustomerSourceController {
  constructor(private readonly customerSourceService: CustomerSourceService) {}

  @Post('create')
  @HttpCode(201)
  async createCustomerSource(
    @Body() createCustomerSourceDTO: CreateCustomerSourceDTO,
  ): Promise<void> {
    return this.customerSourceService.createCustomerSource(
      createCustomerSourceDTO,
    );
  }

  @Get('')
  @HttpCode(200)
  async get(@Query() params: SearchParamsDTO): Promise<any> {
    return this.customerSourceService.get(params);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<any> {
    return this.customerSourceService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateCustomerSourceDTO: UpdateCustomerSourceDTO,
  ): Promise<void> {
    return this.customerSourceService.update(id, updateCustomerSourceDTO);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<void> {
    return this.customerSourceService.delete(id);
  }
}
