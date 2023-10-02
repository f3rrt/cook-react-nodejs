// import {
//    Post,
//    Get,
//    Param,
//    Res,
//    Controller,
//    Body,
//    UploadedFile,
//    HttpException,
//    HttpStatus,
//    Req,
//    UseInterceptors
// } from '@nestjs/common';
// import {
//    ApiCreatedResponse,
//    ApiConsumes,
//    ApiBody,
//    ApiBadRequestResponse,
//    ApiTags,
// } from '@nestjs/swagger';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { PictureService } from './picture.service';

// @Controller('/picture')
// @ApiTags('Picture')
// export class PictureController {
//    constructor(private pictureService: PictureService) {}

//    @Post()
//    @UseInterceptors(FileInterceptor('file'))
//    @ApiConsumes('multipart/form-data')
//    uploadFile(
//      @Body() body: any,
//      @UploadedFile() file: Express.Multer.File,
//    ) {
//     console.log(body, file);
//    }

// }

import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ImageDTO } from '../common/dto/image.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { extname } from 'path';
import { diskStorage } from  'multer';

@Controller('upload')
export class UploadController {
   constructor(private readonly uploadService: UploadService) {}
   @Post()
   @UseInterceptors(
      FileInterceptor('file', {
         storage: diskStorage({
            destination: './public/images',
            filename: (req, file, cb) => {
               const randomName = Array(32)
                  .fill(null)
                  .map(() => Math.round(Math.random() * 16).toString(16))
                  .join('');
               return cb(null, `${randomName}${extname(file.originalname)}`);
            },
         }),
      }),
   )
   @ApiConsumes('multipart/form-data')
   uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {

      return this.uploadService.create(file);
   }

   // @Post()
   //    @UseInterceptors(FileInterceptor('file'))
   //  @ApiConsumes('multipart/form-data')
   // async uploadFile(@UploadedFile() file, @Body() imageDTO: ImageDTO): Promise<any> {
   //   console.log(imageDTO, file);
   //   const { name, description } = imageDTO;
   //   const image = {
   //     name,
   //     description,
   //     file: {
   //       data: file.buffer, // Image binary data
   //       contentType: file.mimetype, // Image content type (e.g., image/jpeg)
   //     },
   //   };

   //   return this.uploadService.create(image);
   // }
}
