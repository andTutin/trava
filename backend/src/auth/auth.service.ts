import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) { }

  async signup(signupDto: SignupDto) {
    const isUserWithEmailAlreadyExists = await this.userService.findByEmail(signupDto.email)

    if (isUserWithEmailAlreadyExists) {
      throw new HttpException('Указанный вами email уже занят ...', HttpStatus.CONFLICT)
    }

    const createdUser = await this.userService.create(signupDto);

    return createdUser
  }

  async validateUser(email: string, password: string): Promise<any> {
    const candidate = await this.userService.findByEmail(email)

    if (candidate && candidate.password === password) {
      const { id, email} = candidate

      return { id, email }
    }

    return null
  }

  async login(user: {id: string, email: string}) {
    const payload = {email: user.email, id: user.id}

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
