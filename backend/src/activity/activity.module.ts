import { forwardRef, Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { FileModule } from 'src/file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from 'src/schemas/activity.schema';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    forwardRef(() => FileModule),
    MongooseModule.forFeature([{name: Activity.name, schema: ActivitySchema}, {name: User.name, schema: UserSchema}])]
  ,
  controllers: [ActivityController],
  providers: [ActivityService, UserService]
})
export class ActivityModule {}
