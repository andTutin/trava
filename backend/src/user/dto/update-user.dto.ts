import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(User) {
    @IsString()
    id: string
}