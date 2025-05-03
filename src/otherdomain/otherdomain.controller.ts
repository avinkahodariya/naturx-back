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
import { OtherDomainService } from './otherdomain.service';
import {
  ICreateOtherDomainDTO,
  IUpdateOtherDomainDTO,
} from './dto/otherdomain';
import { SearchParamsDTO } from '@app/schema';

@ApiBearerAuth()
@Controller('other-domains')
@ApiTags('other-domains')
export class OtherDomainController {
  constructor(private otherDomainService: OtherDomainService) {}

  @Post('create')
  @HttpCode(201)
  async createOtherDomain(
    @Body() createOtherDomainDTO: ICreateOtherDomainDTO,
  ): Promise<void> {
    return this.otherDomainService.createOtherDomain(createOtherDomainDTO);
  }

  @Get('')
  @HttpCode(200)
  async get(@Query() params: SearchParamsDTO): Promise<any> {
    return this.otherDomainService.get(params);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<any> {
    return this.otherDomainService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() body: IUpdateOtherDomainDTO,
  ): Promise<void> {
    return this.otherDomainService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string): Promise<void> {
    return this.otherDomainService.delete(id);
  }
}
