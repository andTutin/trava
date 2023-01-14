import { Controller, Post, Body, UseGuards, Get, Query, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
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
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.fileServise.createFile(file)

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Query('id') id: string) {
    return this.userService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto)
  }

}
