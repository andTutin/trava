import { IsEmail, IsString, MinLength } from 'class-validator';

export class User {
    @IsEmail()
    email: string

    @MinLength(8, {message: 'Пароль слишком короткий. Минимум $constraint1 символов'})
    password: string
    
    @IsString()
    nickname: string

    @IsString()
    firstname: string

    @IsString()
    lastname: string
}
