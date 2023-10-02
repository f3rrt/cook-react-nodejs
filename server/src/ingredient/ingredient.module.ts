import { Global, Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientSchema } from 'src/schema/ingredient.schema';
// import { AuthenticatedGuard } from './guards/authenticated.guard';

@Global()
@Module({
   imports: [MongooseModule.forFeature([{ name: 'Ingredient', schema: IngredientSchema }])],
   controllers: [IngredientController],
   providers: [IngredientService],
   exports: [IngredientService],
})
export class IngredientModule {}
