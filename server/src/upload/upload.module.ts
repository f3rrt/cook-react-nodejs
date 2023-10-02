import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from '../common/services/multer-config.service';
import { UploadService } from './upload.service'
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel } from 'src/model/file.entity';
import { ImageSchema } from 'src/schema/image.schema';

@Module({
    
      imports: [MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }])],

     controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {}