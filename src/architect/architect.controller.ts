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
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArchitectService } from './architect.service';
import { CreateArchitectDTO, UpdateArchitectDTO } from './dto/architect';
import { JwtUserPayload, SearchParamsDTO } from '@app/schema';

@ApiBearerAuth()
@Controller('architect')
@ApiTags('architect')
export class ArchitectController {
  constructor(private readonly architectService: ArchitectService) {}

  @Post('create')
  @HttpCode(201)
  async createArchitect(
    @Body() createArchitectDTO: CreateArchitectDTO,
    @Request() req: any,
  ): Promise<void> {
    return this.architectService.createArchitect(createArchitectDTO, req.user);
  }

  @Get('')
  @HttpCode(200)
  async get(@Query() params: SearchParamsDTO): Promise<any> {
    return this.architectService.get(params);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<any> {
    return this.architectService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateArchitectDTO: UpdateArchitectDTO,
  ): Promise<void> {
    return this.architectService.update(id, updateArchitectDTO);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<void> {
    return this.architectService.delete(id);
  }
}
