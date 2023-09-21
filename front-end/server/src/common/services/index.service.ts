// index.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRecipe } from '../interface/recipe.interface';

@Injectable()
export class IndexService {
  constructor(@InjectModel('Recipe') private recipeModel: any) {}

  async createGlobalTextIndex() {

    await this.recipeModel.collection.createIndexes();
  }
  async getIndex() {

    console.log(await this.recipeModel.getIndexes());
  }
}
