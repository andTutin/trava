import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ActivityModule } from './activity/activity.module';
import { AvatarModule } from './avatar/avatar.module';
import { FileModule } from './file/file.module';
import { GpxModule } from './gpx/gpx.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MongooseModule.forRoot('mongodb://db:27017/trava'),
    AuthModule,
    UserModule,
    ActivityModule,
    AvatarModule,
    FileModule,
    GpxModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
