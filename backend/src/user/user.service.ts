import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Activity } from 'src/schemas/activity.schema';
import { FileService } from 'src/file/file.service';
import * as bcrypt from 'bcrypt';

const saltOrRounds: number = Number(process.env.SALT_OR_ROUNDS)

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {email, password} = createUserDto
    const isUserWithEmailAlreadyExists = await this.findByEmail(email)

    if (isUserWithEmailAlreadyExists) {
      throw new HttpException('Указанный вами email уже занят ...', HttpStatus.CONFLICT)
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = new this.userModel({...createUserDto, password: hashedPassword});
    await newUser.save();

    return {
      userId: newUser.id,
      email: newUser.email
    }
  }

  async findAll() {
    return await this.userModel.find().populate('activities')
  }

  async findById(id: string) {
    return await this.userModel.findById(id).populate('activities').select('-owner')
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).select('id email password')
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.hasOwnProperty('activity')) {
      const user = await this.userModel.findById(id)

      user.activities.push(updateUserDto.activity)

      await user.save()

      return user
    }

    const updatedUser =  await this.userModel.findByIdAndUpdate(id, updateUserDto, {returnDocument: 'after'})

    if (updatedUser) return updatedUser

    return null
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }
}
