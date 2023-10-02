import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(100)
  readonly description: string;
}
