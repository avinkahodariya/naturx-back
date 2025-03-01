import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsMongoId } from 'class-validator';

export class CreateCustomerDTO {
  @ApiProperty({ description: 'Name of the client', example: 'John Doe' })
  @IsString()
  clientName: string;

  @ApiPropertyOptional({
    description: 'Branch name',
    example: 'New York Branch',
  })
  @IsOptional()
  @IsString()
  branch?: string;

  @ApiPropertyOptional({
    description: 'Client contact number',
    example: '+1 234 567 890',
  })
  @IsOptional()
  @IsString()
  contactNo?: string;

  @ApiPropertyOptional({
    description: 'Architect ID (MongoDB ObjectId)',
    example: '64f1a2b345c6789d01234567',
  })
  @IsOptional()
  @IsMongoId()
  architect?: string;

  @ApiPropertyOptional({
    description: "Architect's WhatsApp number",
    example: '+1 987 654 3210',
  })
  @IsOptional()
  @IsString()
  architectWhatsappNo?: string;

  @ApiPropertyOptional({
    description: "Architect's contact number",
    example: '+1 456 789 0123',
  })
  @IsOptional()
  @IsString()
  architectContactNo?: string;

  @ApiPropertyOptional({
    description: "Client's WhatsApp number",
    example: '+1 654 321 0987',
  })
  @IsOptional()
  @IsString()
  whatsappNo?: string;

  @ApiPropertyOptional({
    description:
      'Indicates if the architect is the source customer (if true, architect details are required)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  architectSourceCustomer?: boolean;

  @ApiPropertyOptional({ description: 'Status of the customer', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Array of media URLs',
    example: ['https://example.com/image1.jpg'],
  })
  @IsOptional()
  media?: string[];

  @ApiPropertyOptional({
    description: 'Customer address',
    example: '123 Main St, New York, NY',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Google Maps location link',
    example: 'https://maps.google.com/?q=40.7128,-74.0060',
  })
  @IsOptional()
  @IsString()
  addressLocationLink?: string;
}

export class UpdateCustomerDTO extends CreateCustomerDTO {}
