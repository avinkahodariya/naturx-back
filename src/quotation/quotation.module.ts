import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { DBSchemas } from '@app/schema';

@Module({
  imports: [DBSchemas.quotation],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
