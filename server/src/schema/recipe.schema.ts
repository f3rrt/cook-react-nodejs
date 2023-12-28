import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Recipe {
   @Prop({type: String, text: true}) // Index the  field for text search
   title: string;

   @Prop({type: String, text: true}) // Index the  field for text search
   description?: string;

   @Prop({type: String, text: true}) // Index  field for text search
   instructions: string;

   @Prop()
   imageUrl: string;

   @Prop()
   ingredients: {
      _id: string;
      quantity: number;
      unit: string;
   }[];

}


 const RecipeSchema = SchemaFactory.createForClass(Recipe);

 export { RecipeSchema };
