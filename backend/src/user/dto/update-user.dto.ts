import { PartialType } from '@nestjs/mapped-types';
//import { IsObject, IsString, IsUrl } from 'class-validator';
import { Activity } from 'src/schemas/activity.schema';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto){  
    //@IsString({require: false})
    nickname?: string

    //@IsString()
    firstname?: string

    //@IsString()
    lastname?: string

    //@IsUrl()
    avatar?: string

    //@IsObject()
    activity?: Activity
}