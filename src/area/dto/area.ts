import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDTO {
  @ApiProperty({ description: 'Area name' })
  name: string;

  @ApiProperty({ description: '' })
  isActive?: boolean;
}

export class UpdateAreaDTO extends CreateAreaDTO {}
