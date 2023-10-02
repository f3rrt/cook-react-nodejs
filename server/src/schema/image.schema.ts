import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
  url: String
});

export const Image = mongoose.model('Image', ImageSchema);
