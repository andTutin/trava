import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const  {id, email}=  await createdUser.save();

    return {id, email}
  }

  async findByEmail(email: string): Promise<{id: string, hashedPassword: string} | null> {
     const found =  await this.userModel.findOne({ email })

     if (found) {
      const { _id: id, password: hashedPassword } = found["_doc"]

      return { id, hashedPassword }
    } 

    return null
  }

  async findById(id: string): Promise<Partial<User> | null> {
    const found = await this.userModel.findById(id).populate('activities')

    if (found) {
      const { password, __v, ...rest } = found["_doc"]

      return rest
    }

    return null
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<Partial<User> | null>  {
    const {id, ...updates} = updateUserDto
    const updated =  await this.userModel.findByIdAndUpdate(updateUserDto.id, updates, {returnDocument: 'after'})

    if (updated) {
      const { password, __v, ...updatedUser } = updated["_doc"]

      return updatedUser
    }

    return null
  }

  async addActivity(id: string, activity: any) {
    const found = await this.userModel.findById(id)

    console.log(found)

    await this.updateUser({id, activities: [...found.activities, activity]} as UpdateUserDto)
  }
}
