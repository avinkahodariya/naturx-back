import { Module } from '@nestjs/common';
import { CustomerSourceService } from './customer-source.service';
import { CustomerSourceController } from './customer-source.controller';
import { DBSchemas } from '@app/schema';

@Module({
  imports: [DBSchemas.customerSource],
  controllers: [CustomerSourceController],
  providers: [CustomerSourceService],
})
export class CustomerSourceModule {}
