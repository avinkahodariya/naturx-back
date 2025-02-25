import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Types } from 'mongoose';

export enum UserRoles {
  Admin = 'admin',
  User = "user"
}

export type ID = Types.ObjectId;

export class SearchParamsDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;
}

export class JwtUserPayload {
  email: string;
  id: string;
  role: UserRoles;
}
