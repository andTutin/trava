import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const saltOrRounds: number = Number(process.env.SALT_OR_ROUNDS)

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

    const hashedPassword = await bcrypt.hash(signupDto.password, saltOrRounds);

    const createdUser = await this.userService.create({ email: signupDto.email, password: hashedPassword});

    return createdUser
  }

  async validateUser(email: string, password: string): Promise<any> {
    const candidate = await this.userService.findByEmail(email)
    const isMatch = await bcrypt.compare(password, candidate.password);

    if (candidate && isMatch) {
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
