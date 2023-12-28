import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ImageDTO } from '../common/dto/image.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { extname } from 'path';
import { diskStorage } from  'multer';
import { v4 as uuidv4 } from 'uuid';


@Controller('upload')
export class UploadController {
   constructor(private readonly uploadService: UploadService) {}
   @Post()
   @UseInterceptors(
      FileInterceptor('file', {
         storage: diskStorage({
            destination: process.env.IMAGES,
            filename: (req, file, cb) => {
               let randomName = uuidv4();
               console.log("SAVEEE "+ process.env.IMAGES)
               console.log("SAVEEE "+ `${randomName}${extname(file.originalname)}`)
               return cb(null, `${randomName}${extname(file.originalname)}`);
            },
         }),
      }),
   )
   @ApiConsumes('multipart/form-data')
   uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {

      return this.uploadService.create(file);
   }

}
