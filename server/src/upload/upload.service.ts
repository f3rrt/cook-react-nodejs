import {
   Injectable,
   HttpException,
   HttpStatus,
   ServiceUnavailableException,
   NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, mongo } from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Stream } from 'stream';
import { File } from '../model/file.entity';
import * as path from 'path';

@Injectable()
export class UploadService {
   SERVER_URL:  string  =  process.env.BASE_SERVER_URL;
   constructor(@InjectModel('Image') private readonly imageModel: Model<any>) {}
   // this.bucket = new mongo.GridFSBucket(this.connection.db);

   async create(imageData: any): Promise<any> {

      const createdImage = new this.imageModel( {
         url: `${this.SERVER_URL}/images/${imageData.filename}`,
      });
      return createdImage.save();
   }
}
