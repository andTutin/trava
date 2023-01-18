import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Request, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { GpxService } from './gpx.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('gpx')
export class GpxController {
  constructor(private readonly gpxService: GpxService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('activity'))
  async create(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'application/gpx'}),
    ],
  })) file: Express.Multer.File, @Request() req) {
    const id = req.user.userId
    
    return this.gpxService.create(file, id);
  }
}
