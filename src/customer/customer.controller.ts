import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO, UpdateCustomerDTO } from './customer.dto';
import { SearchParamsDTO } from '@app/schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /** Create a new customer */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    console.log(
      '🚀 ~ customer.controller.ts:28 ~ CustomerController ~ createCustomer ~ createCustomerDTO:',
      createCustomerDTO,
    );
    await this.customerService.createCustomer(createCustomerDTO);
    return { message: 'Customer created successfully' };
  }

  /** Get all customers with pagination */
  @Get()
  async getAllCustomers(@Query() query?: SearchParamsDTO) {
    const { list, total } = await this.customerService.getAllCustomers(query);
    return { total, customers: list };
  }

  /** Get customer by ID */
  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    return await this.customerService.getCustomerById(id);
  }

  /** Update customer by ID */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDTO: UpdateCustomerDTO,
  ) {
    await this.customerService.updateCustomer(id, updateCustomerDTO);
    return { message: 'Customer updated successfully' };
  }

  /** Soft delete customer by ID */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCustomer(@Param('id') id: string) {
    await this.customerService.deleteCustomer(id);
  }
}
