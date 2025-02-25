import { Module } from '@nestjs/common';
import { ArchitectService } from './architect.service';
import { ArchitectController } from './architect.controller';
import { DBSchemas } from '@app/schema';

@Module({
  imports: [DBSchemas.architect],
  controllers: [ArchitectController],
  providers: [ArchitectService],
})
export class ArchitectModule {}
