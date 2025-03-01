import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsMongoId,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateQuotationDTO {
  @ApiProperty({
    description: 'Unique name of the quotation',
    example: 'Quotation #001',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product category ID',
    example: '64f1a2b345c6789d01234567',
  })
  @IsMongoId()
  category: string;

  @ApiProperty({
    description: 'Product ID',
    example: '64f1a2b345c6789d01234568',
  })
  @IsMongoId()
  product: string;

  @ApiProperty({ description: 'Area ID', example: '64f1a2b345c6789d01234569' })
  @IsMongoId()
  area: string;

  @ApiProperty({ description: 'Rate per square feet', example: 150 })
  @IsNumber()
  @Type(() => Number)
  rate: number;

  @ApiProperty({ description: 'Total square feet covered', example: 500 })
  @IsNumber()
  @Type(() => Number)
  sqFeet: number;

  @ApiProperty({ description: 'Tax applied to the quotation', example: 18 })
  @IsNumber()
  @Type(() => Number)
  tax: number;

  @ApiProperty({ description: 'Labor cost', example: 2000 })
  @IsNumber()
  @Type(() => Number)
  labor: number;

  @ApiProperty({ description: 'Discount applied', example: 5 })
  @IsNumber()
  @Type(() => Number)
  discount: number;

  @ApiPropertyOptional({
    description: 'Total price after calculations',
    example: '75000',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  total?: number;

  @ApiPropertyOptional({
    description: 'Indicates if the quotation is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateQuotationDTO extends CreateQuotationDTO {}
