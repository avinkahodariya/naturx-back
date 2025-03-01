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
import { AreaService } from './area.service';
import { CreateAreaDTO, UpdateAreaDTO } from './dto/area';
import { SearchParamsDTO } from '@app/schema';

@ApiBearerAuth()
@Controller('area')
@ApiTags('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post('create')
  @HttpCode(201)
  async createArea(@Body() createAreaDTO: CreateAreaDTO): Promise<void> {
    return this.areaService.createArea(createAreaDTO);
  }

  @Get('')
  @HttpCode(200)
  async get(@Query() params: SearchParamsDTO): Promise<any> {
    return this.areaService.get(params);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<any> {
    return this.areaService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateAreaDTO: UpdateAreaDTO,
  ): Promise<void> {
    return this.areaService.update(id, updateAreaDTO);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<void> {
    return this.areaService.delete(id);
  }
}
