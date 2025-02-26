import { ApiProperty } from '@nestjs/swagger';

export class CreateArchitectDTO {
  @ApiProperty({ description: 'Architect name' })
  name: string;

  @ApiProperty({ description: '' })
  isActive?: boolean;

  @ApiProperty({ description: '' })
  whatsappNo?: string;

  @ApiProperty({ description: '' })
  contactNo?: string;
}

export class UpdateArchitectDTO extends CreateArchitectDTO {}
