import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRecipeDto } from 'src/dto/create-recipe.dto';
import { IRecipe } from 'src/interface/recipe.interface';
import { Model } from 'mongoose';
import { UpdateRecipeDto } from 'src/dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel('Recipe') private recipeModel: Model<IRecipe>) {}
 
  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<IRecipe> {
    const newRecipe = await new this.recipeModel(createRecipeDto);
    return newRecipe.save();
  }
  
  async updateRecipe(
    recipeId: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<IRecipe> {
    const existingRecipe = await this.recipeModel.findByIdAndUpdate(
      recipeId,
      updateRecipeDto,
      { new: true },
    );
    if (!existingRecipe) {
      throw new NotFoundException(`Recipe #${recipeId} not found`);
    }
    return existingRecipe;
  }
  
  async getAllRecipes(): Promise<IRecipe[]> {
    const recipeData = await this.recipeModel.find();
    if (!recipeData || recipeData.length == 0) {
      throw new NotFoundException('Recipes data not found!');
    }
    return recipeData;
  }
 
  async getRecipe(recipeId: string): Promise<IRecipe> {
    const existingRecipe = await this.recipeModel.findById(recipeId).exec();
    if (!existingRecipe) {
      throw new NotFoundException(`Recipe #${recipeId} not found`);
    }
    return existingRecipe;
  }
  
  async deleteRecipe(recipeId: string): Promise<IRecipe> {
    const deletedRecipe = await this.recipeModel.findByIdAndDelete(recipeId);
    if (!deletedRecipe) {
      throw new NotFoundException(`Recipe #${recipeId} not found`);
    }
    return deletedRecipe;
  }
}
