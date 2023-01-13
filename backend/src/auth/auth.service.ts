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
    const {email, password} = signupDto

    const isUserWithEmailAlreadyExists = await this.userService.findByEmail(email)

    if (isUserWithEmailAlreadyExists) {
      throw new HttpException('Указанный вами email уже занят ...', HttpStatus.CONFLICT)
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const createdUser = await this.userService.create({ ...signupDto, password: hashedPassword});

    return this.login({ id: createdUser['_id'], email })
  }

  async validateUser(email: string, password: string): Promise<any> {
    const candidate = await this.userService.findByEmail(email)
    const hashedPassword = candidate?.password || ''
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (candidate && isMatch) {
      const { id, email} = candidate

      return { id, email }
    }

    return null
  }

  async login(user: {id: string, email: string}) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
  
}
