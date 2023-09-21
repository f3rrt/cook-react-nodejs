import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
  _id: Object

  @Prop()
  name: string;

  @Prop()
  password: string;
  
  @Prop()
  refreshToken: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
