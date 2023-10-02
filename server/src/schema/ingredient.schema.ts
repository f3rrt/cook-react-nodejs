import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Ingredient {
  @Prop({ type: String, text: true }) // Index the 'subject' field for text search
  @Prop()
  title: string;

  @Prop()
  description?: string;
}
export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
