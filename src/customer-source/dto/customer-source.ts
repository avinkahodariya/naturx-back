import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerSourceDTO {
  @ApiProperty({ description: 'CustomerSource name' })
  name: string;

  @ApiProperty({ description: '' })
  isActive?: boolean;
}

export class UpdateCustomerSourceDTO extends CreateCustomerSourceDTO {}
