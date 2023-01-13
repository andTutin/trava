import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const saltOrRounds: number = Number(process.env.SALT_OR_ROUNDS)

export type AccessTokenType = {
  access_token: string
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) { }

  async signup(signupDto: SignupDto): Promise<AccessTokenType> {
    const {email, password} = signupDto
    const isUserWithEmailAlreadyExists = await this.userService.findByEmail(email)

    if (isUserWithEmailAlreadyExists) {
      throw new HttpException('Указанный вами email уже занят ...', HttpStatus.CONFLICT)
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const { id } = await this.userService.create({ ...signupDto, password: hashedPassword});

    return this.login(id)
  }

  async validateUser(email: string, password: string): Promise<string | null> {
    const candidate = await this.userService.findByEmail(email)

    if (candidate && await bcrypt.compare(password, candidate.hashedPassword)) {
      const { id } = candidate

      return id
    }

    return null
  }

  async login(id: string): Promise<AccessTokenType> {
    return {
      access_token: this.jwtService.sign({id}),
    };
  }
}