import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { join } from 'path';
import { IndexService } from './common/services/index.service';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.enableCors({
      allowedHeaders: ['content-type', 'authorization'],
      origin: 'https://recipes-quey.onrender.com',
      credentials: true,
   });
   //const indexService = app.get(IndexService);
   // Create the global text index before starting the application
   //await indexService.createGlobalTextIndex();

   app.useGlobalPipes(new ValidationPipe());
   //    app.useStaticAssets(join(__dirname, '..', 'public'), {
   //       index: false,
   //       prefix: '/public',
   //   });
   app.listen(3000)
      .then(() => {
         console.log('successfully stared on port 3000');
      })
      .catch((error) => {
         console.log(error);
      });
}
bootstrap();
