import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRecipeDto } from 'src/common/dto/create-recipe.dto';
import { IRecipe } from 'src/common/interface/recipe.interface';
import { Model } from 'mongoose';
import { UpdateRecipeDto } from 'src/common/dto/update-recipe.dto';
import { IIngredient } from 'src/common/interface/ingredient.interface';

@Injectable()
export class RecipeService {
   constructor(@InjectModel('Recipe') private recipeModel: Model<IRecipe>) {}

   async createRecipe(createRecipeDto: CreateRecipeDto): Promise<IRecipe> {
      const newRecipe = await new this.recipeModel(createRecipeDto);
      return newRecipe.save();
   }

   async updateRecipe(recipeId: string, updateRecipeDto: UpdateRecipeDto): Promise<IRecipe> {

      const existingRecipe = await this.recipeModel.findByIdAndUpdate(recipeId, updateRecipeDto, {
         new: true,
      });
      if (!existingRecipe) {
         throw new NotFoundException(`Recipe #${recipeId} not found`);
      }
      return existingRecipe;
   }

   async getAllRecipes(): Promise<IRecipe[]> {
      const recipeData = await this.recipeModel.find();
      return recipeData;
   }

   async getRecipe(recipeId: string): Promise<IRecipe> {
      const existingRecipe = await this.recipeModel.findById(recipeId).exec();
      if (!existingRecipe) {
         throw new NotFoundException(`Recipe #${recipeId} not found`);
      }
      return existingRecipe;
   }

   async findByIngredient(ingredients: IIngredient[]): Promise<IRecipe[]> {
      const ingredientsIds: string[] = ingredients.map((el) => el._id.toString());
      let recipes = [];
      for (const element of ingredientsIds) {
         const foundRecipes = await this.recipeModel.find({ 'ingredients._id': element });
         recipes = recipes.concat(foundRecipes);
       }
      return recipes;
   }

   async deleteRecipe(recipeId: string): Promise<IRecipe> {
      const deletedRecipe = await this.recipeModel.findByIdAndDelete(recipeId);
      if (!deletedRecipe) {
         throw new NotFoundException(`Recipe #${recipeId} not found`);
      }
      return deletedRecipe;
   }

   async recipeSearch(query: any) {


      const recipeResults = await this.recipeModel.aggregate([
         {
            $search: {
               compound: {
                  should: [
                     {
                        autocomplete: {
                           query: query,
                           path: 'description',
                           fuzzy: {
                              maxEdits: 2,
                              prefixLength: 3,
                           },
                        },
                     },
                     {
                        autocomplete: {
                           query: query,
                           path: 'title',
                           fuzzy: {
                              maxEdits: 2,
                              prefixLength: 3,
                           },
                        },
                     },
                  ],
               },
            },
         },
      ]);

      return recipeResults;
   }
}
