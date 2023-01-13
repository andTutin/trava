import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string

    @MinLength(8, {message: 'Пароль слишком короткий. Минимум $constraint1 символов'})
    password: string
}