import { Document } from 'mongoose';
export interface IRecipe extends Document {
  readonly _id: string;
  readonly title: string;
  readonly description?: string;
  readonly instructions: string;
  readonly imageUrl: string;
  readonly ingredients: {
    _id: string;
    quantity: number;
    unit: string;
 }[];
}
