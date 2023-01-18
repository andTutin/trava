import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ActivityDocument = HydratedDocument<Activity>;

@Schema()
export class Activity {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  owner: User

  @Prop({ required: true })
  file: string;

  @Prop({default: 'Велозаезд'})
  title: string

  @Prop({default: Date.now() })
  date: Date

  @Prop({default: 'Круто покатались!'})
  description: string

  @Prop({required: true, type: Object})
  stats: {
    distance: number
    elevationGain: number
    startedAt: Date
    finishedAt: Date
    duration: string  
  }
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);