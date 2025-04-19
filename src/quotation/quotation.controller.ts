// quotation.controller.ts
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
import { QuotationService } from './quotation.service';
import { CreateQuotationDTO, UpdateQuotationDTO } from './dto/quotation';
import { SearchParamsDTO } from '@app/schema';

@ApiBearerAuth()
@Controller('quotation')
@ApiTags('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post('create')
  @HttpCode(201)
  async createQuotation(@Body() dto: CreateQuotationDTO, @Req() req) {
    return this.quotationService.createQuotation(dto, req.user);
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query() params: SearchParamsDTO) {
    return this.quotationService.findAll(params);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return this.quotationService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() dto: UpdateQuotationDTO) {
    return this.quotationService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    return this.quotationService.remove(id);
  }

  @Delete(':quotation/quotation-item/:id')
  @HttpCode(200)
  async removeQuotationItem(
    @Param('id') id: string,
    @Param('quotationId') quotationId: string,
  ) {
    return this.quotationService.removeQuotationItem(quotationId, id);
  }
}
