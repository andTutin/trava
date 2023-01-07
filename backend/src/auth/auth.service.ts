import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schemas/auth.schema';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) { }

  async signup(signupDto: SignupDto) {
    const isUserWithEmailAlreadyExists = await this.authModel.findOne({ email: signupDto.email })

    if (isUserWithEmailAlreadyExists) {
      throw new HttpException('Указанный вами email уже занят ...', HttpStatus.CONFLICT)
    }

    const createdUser = new this.authModel(signupDto);

    return createdUser.save();
  }

  async signin(signinDto: SignupDto) {
    const candidate = await this.authModel.findOne({ email: signinDto.email })

    if (!candidate) {
      throw new HttpException('Пользователь с таким email не зарегистрирован ...', HttpStatus.NOT_FOUND)
    }

    if (candidate.password !== signinDto.password) {
      throw new HttpException('Ошибка авторизации: неверный email и/или пароль ...', HttpStatus.FORBIDDEN)
    }

    return candidate
  }
}
