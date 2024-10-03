import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  @IsOptional()
  address: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @MinLength(1)
  @MaxLength(30)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  lastName: string;
}
