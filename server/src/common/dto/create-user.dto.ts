import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {

   refreshToken?: string; 

   @IsNotEmpty()
   readonly name: string;

   @IsNotEmpty()
   readonly email: string;

   @IsNotEmpty()
   readonly password: string;
}
