import {Injectable,} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class UploadService {

   constructor(@InjectModel('Image') private readonly imageModel: Model<any>) {
   }

   async create(imageData: any): Promise<any> {

      const imagePath = `/images/${imageData.filename}`;
      return new this.imageModel({
         url: `${imagePath}`,
      }).save();

   }
}
