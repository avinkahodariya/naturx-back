import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PropertyService } from './properties.service';
import { ICreatePropertyDTO, IPropertyResponse, IUpdatePropertyDTO } from './dto/properties';


@Controller('properties')
@ApiBearerAuth()
@ApiTags('properties')
export class PropertyController {
  constructor(private propertyService: PropertyService) { }

  @Post('create')
  @HttpCode(201)
  async createProperty(@Body() createPropertyDTO: ICreatePropertyDTO): Promise<void> {
    return this.propertyService.createProperty(createPropertyDTO);
  }

  @Get('')
  @HttpCode(200)
  async get(@Query() params: any): Promise<IPropertyResponse> {
    return this.propertyService.get(params);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<any> {
    return this.propertyService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() body: IUpdatePropertyDTO): Promise<void> {
    return this.propertyService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string): Promise<void> {
    return this.propertyService.delete(id);
  }
}
