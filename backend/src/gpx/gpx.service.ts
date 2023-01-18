import { Injectable } from '@nestjs/common';
import { ActivityService } from 'src/activity/activity.service';
import { FileService } from 'src/file/file.service';

@Injectable()
export class GpxService {
  constructor(private readonly fileService: FileService, private readonly activityService: ActivityService) {}

  async create(file: Express.Multer.File, id: string) {
    const fileName = await this.fileService.uploadGPX(file)

    return this.activityService.create(id, fileName)
  }
}
