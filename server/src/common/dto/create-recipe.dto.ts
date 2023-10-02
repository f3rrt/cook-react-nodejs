import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateRecipeDto {
   @IsString()
   @MaxLength(50)
   @IsNotEmpty()
   readonly title: string;

   @IsString()
   @MaxLength(100)
   readonly description: string;

   @IsString()
   @MaxLength(500)
   @IsNotEmpty()
   readonly instructions: string;

   @IsString()
   readonly imageUrl: string;

   readonly ingredients: { _id: string; quantity: number; unit: string }[];
}
