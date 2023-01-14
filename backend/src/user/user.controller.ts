import { Controller, Post, Body, UseGuards, Get, Put, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileService } from 'src/file/file.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    private readonly fileServise: FileService
  ) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const id = req.user

    return this.fileServise.uploadAvatar(file, id)

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Request() req) {
    const id = req.user

    return this.userService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Body() updates: Omit<UpdateUserDto, 'id'>, @Request() req) {
    const id = req.user

    return this.userService.updateUser({id, ...updates})
  }
}
