import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Recipe {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  instructions: string;
  @Prop()
  imageUrl: string;
  @Prop()
  ingredients: string;
}
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
