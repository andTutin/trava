import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';
import { UserService } from 'src/user/user.service';
import { ActivityService } from 'src/activity/activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Activity, ActivitySchema } from 'src/schemas/activity.schema';

@Module({
  imports: [
    FileModule, 
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Activity.name, schema: ActivitySchema}
    ])
  ],
  controllers: [AvatarController],
  providers: [AvatarService, FileService, UserService, ActivityService],
  exports: [AvatarService]
})
export class AvatarModule {}
