import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';
import { ActivityService } from 'src/activity/activity.service';
import { Activity, ActivitySchema } from 'src/schemas/activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, {name: Activity.name, schema: ActivitySchema}]),
    forwardRef(() => FileModule)
  ],
  controllers: [UserController],
  providers: [UserService, FileService, ActivityService],
  exports: [UserService]
})
export class UserModule { }
