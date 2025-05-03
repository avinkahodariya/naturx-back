import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { DBSchemas } from '@app/schema';

@Module({
  imports: [DBSchemas.company],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
