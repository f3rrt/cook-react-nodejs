import {Module} from '@nestjs/common';
import {UploadController} from './upload.controller';
import {UploadService} from './upload.service'
import {MongooseModule} from '@nestjs/mongoose';
import {ImageSchema} from 'src/schema/image.schema';

@Module({
    
      imports: [MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }])],

     controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {}