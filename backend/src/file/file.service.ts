import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import { UserService } from '../user/user.service'
import { CreateActivityDto } from 'src/activity/dto/create-activity.dto';
import { ActivityService } from 'src/activity/activity.service';
import { ObjectUnsubscribedError } from 'rxjs';
import mongoose from 'mongoose';

@Injectable()
export class FileService {
    constructor(private userService: UserService, private activityService: ActivityService) { }

    async uploadAvatar(file: Express.Multer.File, id: string): Promise<string> {
        try {
            const fileName = `${id}.jpg`
            const filePath = path.resolve(__dirname, '..' ,'..', 'static')

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer)

            const { avatar } = await this.userService.updateUser({ id , avatar: fileName })

            return avatar

        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async uploadGPX(file: Express.Multer.File, id: string) {
        console.log(id)
        try {
            const fileName = `${uuid.v4()}.jpg` //for now
            const filePath = path.resolve(__dirname, '..' ,'..', 'static')

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer)

            return this.activityService.create({owner: new mongoose.Types.ObjectId(id), file: fileName})

        } catch (e) {

            console.log('zzz', e)
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}