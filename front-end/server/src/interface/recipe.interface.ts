import { Document } from 'mongoose';
export interface IRecipe extends Document {
  readonly title: string;
  readonly description: string;
  readonly instructions: string;
  readonly imageUrl: string;
  readonly ingredients: string;
}
