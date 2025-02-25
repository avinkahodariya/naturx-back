import { Module } from '@nestjs/common';
import { DBSchemas } from 'libs/schema/src';
import { PropertyController } from './properties.controller';
import { PropertyService } from './properties.service';
import { AwsModule } from 'src/aws/aws.module';
import { AwsService } from 'src/aws/aws.service';


@Module({
  imports: [DBSchemas.property, DBSchemas.aws, AwsModule],
  controllers: [PropertyController],
  providers: [PropertyService, AwsService],
})
export class PropertyModule { }
