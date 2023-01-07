import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    //MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
