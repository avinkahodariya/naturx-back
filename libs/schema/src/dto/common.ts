import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
  Customer = 'customer',
}

export type ID = Types.ObjectId;

export class SearchParamsDTO {
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 0,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Limit for pagination',
    example: 10,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Search',
    example: 'ABC',
    type: String,
  })
  search?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by active status',
    example: true,
    type: Boolean,
  })
  @Transform(({ value }) => {
    // note: value will be a string if it came from query
    if (typeof value === 'string') {
      return ['true', '1', 'yes'].includes(value.toLowerCase());
    }
    return Boolean(value);
  })
  @IsBoolean()
  isActive?: boolean;
}

export class JwtUserPayload {
  email: string;
  id: string;
  role: UserRoles;
}
