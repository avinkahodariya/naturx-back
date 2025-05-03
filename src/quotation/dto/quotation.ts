// dto/quotation.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
  IsNumber,
  Min,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { QuotationStatus } from '@app/schema';

export class CreateQuotationItemDTO {
  @ApiProperty({
    description: 'ID of the product category',
    example: '60f7f8a2b7123c001ce4d1e7',
  })
  @IsNotEmpty()
  @IsMongoId()
  category: string;

  @ApiProperty({
    description: 'ID of the product',
    example: '60f7f8a2b7123c001ce4d1e8',
  })
  @IsNotEmpty()
  @IsMongoId()
  product: string;

  @ApiProperty({
    description: 'ID of the area',
    example: '60f7f8a2b7123c001ce4d1e9',
  })
  @IsNotEmpty()
  @IsMongoId()
  area: string;

  @ApiProperty({
    description: 'Rate per unit',
    example: 120.5,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  rate: number;

  @ApiProperty({
    description: 'Square feet quantity',
    example: 250,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  sqFeet: number;

  @ApiProperty({
    description: 'Tax amount',
    example: 18.75,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  tax: number;

  @ApiProperty({
    description: 'Labor cost',
    example: 50,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  labor: number;

  @ApiProperty({
    description: 'Discount amount',
    example: 10,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  discount: number;

  @ApiPropertyOptional({
    description: 'Total for this item (rate*sqFeet + tax + labor - discount)',
    example: 120.5 * 250 + 18.75 + 50 - 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  total?: number;
}

export class UpdateQuotationItemDTO {
  @ApiPropertyOptional({
    description: 'ID of the product category',
    example: '60f7f8a2b7123c001ce4d1e7',
  })
  @IsOptional()
  @IsMongoId()
  category?: string;

  @ApiPropertyOptional({
    description: 'ID of the product item',
    example: '60f7f8a2b7123c001ce4d1e7',
  })
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @ApiPropertyOptional({
    description: 'ID of the product',
    example: '60f7f8a2b7123c001ce4d1e8',
  })
  @IsOptional()
  @IsMongoId()
  product?: string;

  @ApiPropertyOptional({
    description: 'ID of the area',
    example: '60f7f8a2b7123c001ce4d1e9',
  })
  @IsOptional()
  @IsMongoId()
  area?: string;

  @ApiPropertyOptional({
    description: 'Rate per unit',
    example: 130.75,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  rate?: number;

  @ApiPropertyOptional({
    description: 'Square feet quantity',
    example: 300,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  sqFeet?: number;

  @ApiPropertyOptional({
    description: 'Tax amount',
    example: 22.5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  tax?: number;

  @ApiPropertyOptional({
    description: 'Labor cost',
    example: 60,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  labor?: number;

  @ApiPropertyOptional({
    description: 'Discount amount',
    example: 15,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiPropertyOptional({
    description: 'Total for this item (computed)',
    example: 130.75 * 300 + 22.5 + 60 - 15,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  total?: number;
}

export class CreateQuotationDTO {
  @ApiProperty({
    example: 'My first quotation',
    description: 'A friendly name for this quotation',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '60f7f8a2b7123c001ce4d1e7',
    description: 'Customer id for this quotation',
  })
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @ApiPropertyOptional({
    enum: QuotationStatus,
    example: QuotationStatus.PENDING,
    default: QuotationStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(QuotationStatus)
  status?: QuotationStatus;

  @ApiPropertyOptional({
    type: [CreateQuotationItemDTO],
    description: 'Line‑items belonging to this quotation',
    example: [
      {
        category: '60f7f8a2b7123c001ce4d1e7',
        product: '60f7f8a2b7123c001ce4d1e8',
        area: '60f7f8a2b7123c001ce4d1e9',
        rate: 120.5,
        sqFeet: 250,
        tax: 18.75,
        labor: 50,
        discount: 10,
        total: 120.5 * 250 + 18.75 + 50 - 10,
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuotationItemDTO)
  quotationItems?: CreateQuotationItemDTO[];
}

export class UpdateQuotationDTO {
  @ApiPropertyOptional({
    example: 'Updated quotation name',
    description: 'A friendly name for this quotation',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    enum: QuotationStatus,
    example: QuotationStatus.ACCEPTED,
  })
  @IsOptional()
  @IsEnum(QuotationStatus)
  status?: QuotationStatus;

  @ApiPropertyOptional({
    type: [UpdateQuotationItemDTO],
    description: 'Updated list of line‑items',
    example: [
      {
        category: '60f7f8a2b7123c001ce4d1e7',
        product: '60f7f8a2b7123c001ce4d1e8',
        area: '60f7f8a2b7123c001ce4d1e9',
        rate: 130.75,
        sqFeet: 300,
        tax: 22.5,
        labor: 60,
        id: '60f7f8a2b7123c001ce4d1e9',
        discount: 15,
        total: 130.75 * 300 + 22.5 + 60 - 15,
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuotationItemDTO)
  quotationItems?: UpdateQuotationItemDTO[];
}
