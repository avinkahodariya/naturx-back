import { Module } from '@nestjs/common';
import { CommonUtilsService } from './common-utils.service';
import { DateUtilsService } from './date-utils.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  providers: [
    CommonUtilsService,
    DateUtilsService,
  ],
  exports: [
    CommonUtilsService,
    DateUtilsService,
  ],
})
export class CommonUtilsModule {}
