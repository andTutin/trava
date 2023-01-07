import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async signup(signupDto: SignupDto) {
    const isUserWithEmailAlreadyExists = await this.userService.findByEmail(signupDto.email)

    if (isUserWithEmailAlreadyExists) {
      throw new HttpException('Указанный вами email уже занят ...', HttpStatus.CONFLICT)
    }

    const createdUser = await this.userService.create(signupDto);

    return createdUser
  }

  async signin(signinDto: SigninDto) {
    const candidate = await this.userService.findByEmail(signinDto.email)

    if (!candidate) {
      throw new HttpException('Пользователь с таким email не зарегистрирован ...', HttpStatus.NOT_FOUND)
    }

    if (candidate.password !== signinDto.password) {
      throw new HttpException('Ошибка авторизации: неверный email и/или пароль ...', HttpStatus.FORBIDDEN)
    }

    return candidate
  }
}
