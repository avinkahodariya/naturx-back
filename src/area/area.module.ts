import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { DBSchemas } from '@app/schema';

@Module({
  imports: [DBSchemas.area],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
