import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Request, UseGuards, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: /[\/.](jpg|jpeg|png)$/i}),
    ],
  })) file: Express.Multer.File, @Request() req) {
    const id = req.user.userId;

    return this.avatarService.create(file, id);
  }
}
