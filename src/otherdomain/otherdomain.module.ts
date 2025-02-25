import { Module } from '@nestjs/common';
import { DBSchemas } from 'libs/schema/src';
import { OtherDomainController } from './otherdomain.controller';
import { OtherDomainService } from './otherdomain.service';
import { AwsModule } from 'src/aws/aws.module';
import { AwsService } from 'src/aws/aws.service';



@Module({
  imports: [DBSchemas.otherdomain, DBSchemas.aws, AwsModule],
  controllers: [OtherDomainController],
  providers: [OtherDomainService, AwsService],
})
export class OtherDomainModule { }
