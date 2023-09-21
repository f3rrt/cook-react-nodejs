import {
   Body,
   Controller,
   Delete,
   Get,
   HttpStatus,
   Param,
   Post,
   Put,
   Query,
   Res,
   UseGuards,
} from '@nestjs/common';
import { CreateRecipeDto } from 'src/common/dto/create-recipe.dto';
import { UpdateRecipeDto } from 'src/common/dto/update-recipe.dto';
import { RecipeService } from './recipe.service';
import { RtGuard } from 'src/common/guards/rt.guard';
import { IngredientService } from 'src/ingredient/ingredient.service';

@Controller('recipe')
export class RecipeController {
   constructor(
      private readonly recipeService: RecipeService,
      private ingredientService: IngredientService,
   ) {}

   @UseGuards(RtGuard)
   @Post()
   async createRecipe(@Res() response, @Body() createRecipeDto: CreateRecipeDto) {
      try {
         const newRecipe = await this.recipeService.createRecipe(createRecipeDto);
         return response.status(HttpStatus.CREATED).json({
            message: 'Recipe has been created successfully',
            newRecipe,
         });
      } catch (err) {
         return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error: Recipe not created!',
            error: 'Bad Request',
         });
      }
   }

   @UseGuards(RtGuard)
   @Put('/:id')
   async updateRecipe(
      @Res() response,
      @Param('id') recipeId: string,
      @Body() updateRecipeDto: UpdateRecipeDto,
   ) {
      try {
         const existingRecipe = await this.recipeService.updateRecipe(recipeId, updateRecipeDto);
         return response.status(HttpStatus.OK).json({
            message: 'Recipe has been successfully updated',
            existingRecipe,
         });
      } catch (err) {
         console.log(err);
         return response.status(err.status).json(err.response);
      }
   }

   @Get()
   async getRecipes(@Res() response) {
      try {
         const recipes = await this.recipeService.getAllRecipes();
         return response.status(HttpStatus.OK).json(recipes);
      } catch (err) {
         console.log(err);
         return response.json(err.response);
      }
   }

   @UseGuards(RtGuard)
   @Get('/:id')
   async getRecipe(@Res() response, @Param('id') recipeId: string) {
      try {
         const recipe = await this.recipeService.getRecipe(recipeId);
         return response.status(HttpStatus.OK).json(recipe);
      } catch (err) {
         console.log(err);
         return response.status(err?.status).json(err.response);
      }
   }

   @UseGuards(RtGuard)
   @Post('/search')
   async searchRecipe(@Res() response, @Body() str: any) {
      try {
         if(str.data) {
            let recipeResult = await this.recipeService.recipeSearch(str.data);
            const ingredientResult = await this.ingredientService.ingredientSearch(str.data);
            if (ingredientResult.length > 0) {
               const foundedRecipes = await this.recipeService.findByIngredient(ingredientResult);
               recipeResult = foundedRecipes.concat(recipeResult);
            }
            return response.status(HttpStatus.OK).json(recipeResult);
         } 
         return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'Error: String is Empty',
            error: 'Bad Request',
         });
      } catch (err) {
         console.log(err);
         return response.json(err.response);
      }
   }

   @UseGuards(RtGuard)
   @Delete('/:id')
   async deleteRecipe(@Res() response, @Param('id') recipeId: string) {
      try {
         const deletedRecipe = await this.recipeService.deleteRecipe(recipeId);
         return response?.status(HttpStatus.OK).json({
            message: 'Recipe deleted successfully',
            deletedRecipe,
         });
      } catch (err) {
         return response.status(err?.status).json(err.response);
      }
   }
}
