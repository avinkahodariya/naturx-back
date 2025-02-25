import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryDTO {
  @ApiProperty({ description: 'ProductCategory name' })
  name: string;

  @ApiProperty({ description: '' })
  isActive?: boolean;
}

export class UpdateProductCategoryDTO extends CreateProductCategoryDTO {}
