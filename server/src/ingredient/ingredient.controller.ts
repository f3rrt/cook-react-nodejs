import {
   Body,
   Controller,
   Delete,
   Get,
   HttpStatus,
   Param,
   Post,
   Put,
   Res,
   UseGuards,
} from '@nestjs/common';
import { CreateIngredientDto } from 'src/common/dto/create-ingredient.dto';
import { UpdateIngredientDto } from 'src/common/dto/update-ingredient.dto';
import { IngredientService } from './ingredient.service';
import { RtGuard } from 'src/common/guards/rt.guard';
import { Ingredient } from 'src/schema/ingredient.schema';
import { error } from 'console';

@Controller('ingredient')
export class IngredientController {
   constructor(private readonly ingredientService: IngredientService) {}

   @UseGuards(RtGuard)
   @Post()
   async createIngredient(@Res() response, @Body() createIngredientDto: CreateIngredientDto) {
      try {
         const newIngredient = await this.ingredientService.createIngredient(createIngredientDto);
         return response.status(HttpStatus.CREATED).json(newIngredient);
      } catch (err) {
         return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error: Ingredient not created!',
            error: 'Bad Request',
         });
      }
   }


   @UseGuards(RtGuard)
   @Post('getbyid')
   async findIngredientsByIds(@Res() response, @Body() ingredientIds: string[]) {
      try {
         const ingredients = await this.ingredientService.findIngredientsByIds(ingredientIds);
         return response.status(HttpStatus.CREATED).json(ingredients);
      } catch (err) {
         return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error: Ingredient not founded!',
            error: error,
         });
      }
   }

   @UseGuards(RtGuard)
   @Put('/:id')
   async updateIngredient(
      @Res() response,
      @Param('id') ingredientId: string,
      @Body() updateIngredientDto: UpdateIngredientDto,
   ) {
      try {
         const existingIngredient = await this.ingredientService.updateIngredient(
            ingredientId,
            updateIngredientDto,
         );
         return response.status(HttpStatus.OK).json(existingIngredient);
      } catch (err) {
         return response.status(err.status).json(err.response);
      }
   }

   @UseGuards(RtGuard)
   @Get()
   async getIngredients(@Res() response) {
      try {
         const ingredients = await this.ingredientService.getAllIngredients();
         return response.status(HttpStatus.OK).json(ingredients);
      } catch (err) {
         console.log(err);
         return response.status(err.status).json(err.response);
      }
   }

   @UseGuards(RtGuard)
   @Get('/:id')
   async getIngredient(@Res() response, @Param('id') ingredientId: string) {
      try {
         const existingIngredient = await this.ingredientService.getIngredient(ingredientId);
         return response.status(HttpStatus.OK).json(existingIngredient);
      } catch (err) {
         return response.status(err.status).json(err.response);
      }
   }

   @UseGuards(RtGuard)
   @Delete('/:id')
   async deleteIngredient(@Res() response, @Param('id') ingredientId: string) {
      try {
         const deletedIngredient = await this.ingredientService.deleteIngredient(ingredientId);
         return response.status(HttpStatus.OK).json(deletedIngredient);
      } catch (err) {
         return response.status(err.status).json(err.response);
      }
   }
}
