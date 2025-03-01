import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductsDTO {
  @ApiProperty({ description: 'Product name' })
  name: string;

  @ApiProperty({ description: 'Product is active or not' })
  isActive?: boolean;

  @ApiProperty({ description: 'Category ID' })
  @IsMongoId()
  @Type(() => String) // Ensures ObjectId is serialized correctly
  category?: Types.ObjectId;

  @ApiProperty({ description: 'Area ID' })
  @IsMongoId()
  @Type(() => String)
  area?: Types.ObjectId;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'Rate per square' })
  ratePerSq?: number;

  @ApiProperty({ description: 'Product code' })
  code?: string;

  @ApiProperty({ description: 'Product media' })
  media?: string[];
}

export class UpdateProductsDTO extends CreateProductsDTO {}
