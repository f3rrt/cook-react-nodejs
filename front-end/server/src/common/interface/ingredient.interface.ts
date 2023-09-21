import { Document } from 'mongoose';
export interface IIngredient extends Document {
  readonly _id: string;
  readonly title: string;
  readonly description?: string;
}
