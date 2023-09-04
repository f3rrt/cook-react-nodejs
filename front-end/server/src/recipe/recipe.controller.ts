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
} from '@nestjs/common';
import { CreateRecipeDto } from 'src/dto/create-recipe.dto';
import { UpdateRecipeDto } from 'src/dto/update-recipe.dto';
import { RecipeService } from './recipe.service';
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @Post()
  async createRecipe(
    @Res() response,
    @Body() createRecipeDto: CreateRecipeDto,
  ) {
    try {
      const newRecipe = await this.recipeService.createRecipe(
        createRecipeDto,
      );
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
  @Put('/:id')
  async updateRecipe(
    @Res() response,
    @Param('id') recipeId: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    try {
      const existingRecipe = await this.recipeService.updateRecipe(
        recipeId,
        updateRecipeDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Recipe has been successfully updated',
        existingRecipe,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getRecipes(@Res() response) {
    try {
      const recipeData = await this.recipeService.getAllRecipes();
      return response.status(HttpStatus.OK).json({
        message: 'All recipes data found successfully',
        recipeData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getRecipe(@Res() response, @Param('id') recipeId: string) {
    try {
      const existingRecipe = await this.recipeService.getRecipe(recipeId);
      return response.status(HttpStatus.OK).json({
        message: 'Recipe found successfully',
        existingRecipe,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteRecipe(@Res() response, @Param('id') recipeId: string) {
    try {
      const deletedRecipe = await this.recipeService.deleteRecipe(recipeId);
      return response.status(HttpStatus.OK).json({
        message: 'Recipe deleted successfully',
        deletedRecipe,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
