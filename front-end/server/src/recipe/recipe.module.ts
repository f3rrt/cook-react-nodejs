import { Global, Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from 'src/schema/recipe.schema';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { IngredientModule } from 'src/ingredient/ingredient.module';
// import { AuthenticatedGuard } from './guards/authenticated.guard';

@Global()
@Module({
   imports: [MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]), IngredientModule],
   controllers: [RecipeController],
   providers: [RecipeService],
   exports: [],
})
export class RecipeModule {}
