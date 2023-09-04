import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Ingredient {
  @Prop()
  title: string;
  @Prop()
  description: string;
}
export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
