import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DBSchemas } from '@app/schema';

@Module({
  imports: [DBSchemas.customer],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
