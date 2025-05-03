import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'The name of the company',
    type: String,
    example: 'TechCorp Pvt Ltd',
  })
  @IsString()
  companyName: string;

  @ApiProperty({
    description: 'The registration number of the company',
    type: String,
    example: '12345ABC',
  })
  @IsString()
  registrationNumber: string;

  @ApiProperty({
    description: 'The email address of the company',
    type: String,
    example: 'contact@techcorp.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'The GST number of the company, if applicable',
    type: String,
    example: '12345GST123',
  })
  @IsOptional()
  @IsString()
  gstNumber?: string;

  @ApiPropertyOptional({
    description: 'The tax number of the company, if applicable',
    type: String,
    example: 'TAX123456',
  })
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiPropertyOptional({
    description: 'The PAN number of the company, if applicable',
    type: String,
    example: 'PAN1234XYZ',
  })
  @IsOptional()
  @IsString()
  panNumber?: string;

  @ApiPropertyOptional({
    description: 'The website URL of the company, if applicable',
    type: String,
    example: 'https://www.techcorp.com',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({
    description: 'The contact number of the company, if applicable',
    type: String,
    example: '+91-123-456-7890',
  })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiPropertyOptional({
    description: 'The physical address of the company, if applicable',
    type: String,
    example: '123 Tech Street, Silicon Valley, CA',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Indicates whether the company is active or not',
    type: Boolean,
    default: true,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCompanyDto {
  @ApiPropertyOptional({
    description: 'The name of the company (to be updated)',
    type: String,
    example: 'TechCorp Solutions',
  })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({
    description: 'The registration number of the company (to be updated)',
    type: String,
    example: '12345DEF',
  })
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiPropertyOptional({
    description: 'The email address of the company (to be updated)',
    type: String,
    example: 'info@techcorp.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'The GST number of the company (to be updated), if applicable',
    type: String,
    example: 'GST12345',
  })
  @IsOptional()
  @IsString()
  gstNumber?: string;

  @ApiPropertyOptional({
    description: 'The tax number of the company (to be updated), if applicable',
    type: String,
    example: 'TAX1234567',
  })
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiPropertyOptional({
    description: 'The PAN number of the company (to be updated), if applicable',
    type: String,
    example: 'PAN5678XYZ',
  })
  @IsOptional()
  @IsString()
  panNumber?: string;

  @ApiPropertyOptional({
    description:
      'The website URL of the company (to be updated), if applicable',
    type: String,
    example: 'https://www.newtechcorp.com',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({
    description:
      'The contact number of the company (to be updated), if applicable',
    type: String,
    example: '+91-987-654-3210',
  })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiPropertyOptional({
    description:
      'The physical address of the company (to be updated), if applicable',
    type: String,
    example: '456 New Tech Lane, San Francisco, CA',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description:
      'Indicates whether the company is active or not (to be updated)',
    type: Boolean,
    default: true,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
