import { ApiProperty } from '@nestjs/swagger';

export class CreateArchitectDTO {
  @ApiProperty({ description: 'Architect name' })
  name: string;

  @ApiProperty({ description: '' })
  isActive?: boolean;

  @ApiProperty({ description: '' })
  whatsappNo?: boolean;

  @ApiProperty({ description: '' })
  contactNo?: boolean;
}

export class UpdateArchitectDTO extends CreateArchitectDTO {}
