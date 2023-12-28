import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.enableCors();

   // app.enableCors({
   //    allowedHeaders: ['content-type', 'authorization'],
   //    origin: process.env.REACT_APP_SERVER_ENDPOINT,
   //    credentials: true,
   // });

   app.useGlobalPipes(new ValidationPipe());
   app.listen(process.env.SERVER_PORT)
       .then(() => {
          console.log('successfully stared on port ' + process.env.SERVER_PORT);
       })
       .catch((error) => {
          console.log(error);
       });
}
bootstrap();
