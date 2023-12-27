import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateIngredientDto } from 'src/common/dto/create-ingredient.dto';
import { IIngredient } from 'src/common/interface/ingredient.interface';
import { Model } from 'mongoose';
import { UpdateIngredientDto } from 'src/common/dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
   constructor(@InjectModel('Ingredient') private ingredientModel: Model<IIngredient>) {}

   async createIngredient(createIngredientDto: CreateIngredientDto): Promise<IIngredient> {
      const newIngredient = await new this.ingredientModel(createIngredientDto);
      return newIngredient.save();
   }

   async findIngredientsByIds(ingreIds: string[]): Promise<IIngredient[]> {
      const ingredients = await this.ingredientModel.find({ _id: { $in: ingreIds } });
      return ingredients;
   }

   async updateIngredient(
      ingredientId: string,
      updateIngredientDto: UpdateIngredientDto,
   ): Promise<IIngredient> {
      const existingIngredient = await this.ingredientModel.findByIdAndUpdate(
         ingredientId,
         updateIngredientDto,
         { new: true },
      );
      if (!existingIngredient) {
         throw new NotFoundException(`Ingredient #${ingredientId} not found`);
      }
      return existingIngredient;
   }

   async getAllIngredients(): Promise<IIngredient[]> {
      const ingredientData = await this.ingredientModel.find();
      // if (!ingredientData || ingredientData.length == 0) {
      //   throw new NotFoundException('Ingredients data not found!');
      // }
      return ingredientData;
   }

   async getIngredient(ingredientId: string): Promise<IIngredient> {
      const existingIngredient = await this.ingredientModel.findById(ingredientId).exec();
      if (!existingIngredient) {
         throw new NotFoundException(`Ingredient #${ingredientId} not found`);
      }
      return existingIngredient;
   }

   async deleteIngredient(ingredientId: string): Promise<any> {
      const deletedIngredient = await this.ingredientModel.findByIdAndDelete(ingredientId);
      if (!deletedIngredient) {
         throw new NotFoundException(`Ingredient #${ingredientId} not found`);
      }
      return deletedIngredient;
   }

   async ingredientSearch(query: any) {
      const igredientResults = await this.ingredientModel.aggregate([
         {
            $search: {
               compound: {
                  should: [
                     {
                        autocomplete: {
                           // Variable we want to use for the search
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
      return igredientResults;
   }
}
