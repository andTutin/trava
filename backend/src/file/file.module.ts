import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { FileService } from './file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
  providers: [FileService, UserService],
  exports: [FileService]
})
export class FileModule {}