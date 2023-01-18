import { IsEmail, IsString, IsArray, MinLength } from 'class-validator';
import { Activity } from 'src/schemas/activity.schema';

export class CreateUserDto {
    @IsEmail()
    email: string

    @MinLength(8, {message: 'Пароль слишком короткий. Минимум $constraint1 символов'})
    password: string
}