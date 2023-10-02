import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateIPictureDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly description: string;
}