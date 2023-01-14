import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import { UserService } from '../user/user.service'

@Injectable()
export class FileService {
    constructor(private userService: UserService) { }

    async createFile(file: Express.Multer.File, id: string): Promise<string> {
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

}