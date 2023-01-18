import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as path from 'path'
import * as fs from 'fs';
import mongoose, { Model, Mongoose, Types } from 'mongoose';
import { Activity, ActivityDocument } from 'src/schemas/activity.schema';
import { UserService } from 'src/user/user.service';
import { UpdateActivityDto } from './dto/update-activity.dto';
import * as gpx from 'gpx-for-runners';

@Injectable()
export class ActivityService {
  constructor(@InjectModel(Activity.name) private activityModel: Model<ActivityDocument>, private userService: UserService) {}
  
  async create(id: string, fileName: string) {
    const filePath = path.resolve(__dirname, '..' ,'..', 'static');
    const gpxData = new gpx(fs.readFileSync(path.join(filePath, fileName), 'utf-8'));
    const stats = {
      distance: gpxData.distance(),
      elevationGain: gpxData.elevation().gain,
      startedAt: gpxData.duration().start,
      finishedAt: gpxData.duration().end,
      duration: gpxData.duration().total
    }

    const createdActivity = new this.activityModel({file: fileName, owner: id, stats});

    await createdActivity.save()
    await this.userService.update(id, {activity: createdActivity.id})

    return createdActivity
  }

  async findAll() {
    return await this.activityModel.find().populate('owner');
  }

  async findById(id: string) {
    return await this.activityModel.findById(id).populate('owner');
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    return await this.activityModel.findByIdAndUpdate(id, updateActivityDto, {returnDocument: 'after'});
  }

  async remove(id: string) {
    return await this.activityModel.findByIdAndDelete(id);
  }
}
