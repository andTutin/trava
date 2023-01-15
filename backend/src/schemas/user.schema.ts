import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Activity } from './activity.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({default: ''})
  nickname: string

  @Prop({default: ''})
  firstname: string

  @Prop({default: ''})
  lastname: string

  @Prop({default: 'https://image.pngaaa.com/117/4811117-small.png'})
  avatar: string

  @Prop({default: [], type: [mongoose.Schema.Types.ObjectId], ref: 'Activity'})
  activities: Activity[] 
}

export const UserSchema = SchemaFactory.createForClass(User);