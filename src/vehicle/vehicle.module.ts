import { Module } from '@nestjs/common';
import { DBSchemas } from 'libs/schema/src';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { AwsModule } from 'src/aws/aws.module';
import { AwsService } from 'src/aws/aws.service';


@Module({
  imports: [DBSchemas.vehicle, DBSchemas.aws, AwsModule],
  controllers: [VehicleController],
  providers: [VehicleService, AwsService],
})
export class VehicleModule { }
