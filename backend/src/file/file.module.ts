import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { FileService } from './file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { ActivityModule } from 'src/activity/activity.module';
import { ActivityService } from 'src/activity/activity.service';
import { Activity, ActivitySchema } from 'src/schemas/activity.schema';

@Module({
  imports: [
    forwardRef(() => ActivityModule),
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {name: Activity.name, schema: ActivitySchema}
    ]),
  ],
  providers: [FileService, UserService, ActivityService],
  exports: [FileService]
})
export class FileModule {}