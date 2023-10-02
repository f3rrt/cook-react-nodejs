import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Recipe {
   @Prop({ type: String, text: true }) // Index the  field for text search
   title: string;

   @Prop({ type: String, text: true }) // Index the  field for text search
   description?: string;

   @Prop({ type: String, text: true }) // Index  field for text search
   instructions: string;

   @Prop()
   imageUrl: string;

   @Prop()
   ingredients: {
      _id: string;
      quantity: number;
      unit: string;
   }[];

   // @Prop({ type: String, index: 'text' })
   // _text: string;
}


 const RecipeSchema = SchemaFactory.createForClass(Recipe);

//  RecipeSchema.index({ title: 'text' });
//  RecipeSchema.index({ description: 'text' });
 
 export { RecipeSchema };
