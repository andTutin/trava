import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AvatarService {
  constructor(private readonly fileService: FileService, private readonly userService: UserService) {}
  
  async create(file: Express.Multer.File, id: string) {
    const fileName = await this.fileService.uploadAvatar(file, id)

    return this.userService.update(id, {avatar: fileName})
  }
}
