import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => FileModule)
  ],
  controllers: [UserController],
  providers: [UserService, FileService],
  exports: [UserService]
})
export class UserModule { }
