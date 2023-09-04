import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeSchema } from './schema/recipe.schema';
import { RecipeService } from './recipe/recipe.service';
import { RecipeController } from './recipe/recipe.controller';
const MONGO_URI = 'mongodb://localhost:27017/cook';

const uri =
   'mongodb+srv://olxovikjulia:LIrFQrOkgfNv39vm@cluster0.1ogsvze.mongodb.net/?retryWrites=true&w=majority';

@Module({
   imports: [
      MongooseModule.forRoot(uri, {
         dbName: 'cook',
      }),
      MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
   ],
   controllers: [AppController, RecipeController],
   providers: [AppService, RecipeService],
})
export class AppModule {}
