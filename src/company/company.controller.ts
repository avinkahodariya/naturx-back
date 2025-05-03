import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { SearchParamsDTO } from '@app/schema';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('company')
@ApiTags('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @Get()
  async findAll(@Query() params: SearchParamsDTO) {
    return this.companyService.getAllCompanies(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyService.getCompanyById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.companyService.deleteCompany(id);
  }
}
