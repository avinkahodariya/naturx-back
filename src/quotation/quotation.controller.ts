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
  async createQuotation(
    @Body() createQuotationDTO: CreateQuotationDTO,
    @Req() req,
  ): Promise<void> {
    return this.quotationService.createQuotation(createQuotationDTO, req.user);
  }

  @Get('')
  @HttpCode(200)
  async get(@Query() params: SearchParamsDTO): Promise<any> {
    return this.quotationService.get(params);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<any> {
    return this.quotationService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateQuotationDTO: UpdateQuotationDTO,
  ): Promise<void> {
    return this.quotationService.update(id, updateQuotationDTO);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<void> {
    return this.quotationService.delete(id);
  }
}
