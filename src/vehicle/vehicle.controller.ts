import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchParamsDTO, Vehicle } from 'libs/schema/src';
import { VehicleService } from './vehicle.service';
import { ICreateVehicleDTO, IVehicleResponse, IVehicleUpdateRequest } from './dto/vehicle';

@Controller('vehicles')
@ApiBearerAuth()
@ApiTags('vehicles')
export class VehicleController {
  constructor(private vehicleService: VehicleService) { }

  @Post('create')
  @HttpCode(201)
  async createVehicle(@Body() createVehicleDTO: ICreateVehicleDTO): Promise<void> {
    return this.vehicleService.createVehicle(createVehicleDTO);
  }

  @Get('')
  @HttpCode(200)
  get(@Query() params: SearchParamsDTO): Promise<IVehicleResponse> {
    return this.vehicleService.get(params);
  }


  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string): Promise<Vehicle> {
    return this.vehicleService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() body: IVehicleUpdateRequest,
  ): Promise<void> {
    return this.vehicleService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string): Promise<void> {
    return this.vehicleService.delete(id);
  }
}
