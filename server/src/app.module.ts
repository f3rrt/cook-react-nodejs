import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RecipeSchema} from './schema/recipe.schema';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {RecipeModule} from './recipe/recipe.module';
import {ConfigModule} from '@nestjs/config';
import {IngredientModule} from './ingredient/ingredient.module';
import {MulterModule} from '@nestjs/platform-express';
import {UploadModule} from './upload/upload.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {IndexService} from './common/services/index.service';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: '.env',
         isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.DB_URI, {
         dbName: process.env.DB_NAME,
      }),
      MulterModule.register({dest: process.env.IMAGES}),
      ServeStaticModule.forRoot({
         rootPath: join(__dirname, '..', 'public'),
      }),
      MongooseModule.forFeature([{name: 'Recipe', schema: RecipeSchema}]),
      AuthModule,
      UsersModule,
      RecipeModule,
      IngredientModule,
      UploadModule,
   ],
   controllers: [AppController],
   providers: [AppService, IndexService],
})
export class AppModule {}
