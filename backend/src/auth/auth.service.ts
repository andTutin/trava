import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export type AccessTokenType = {
  access_token: string
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) { }

  async signup(signupDto: SignupDto): Promise<AccessTokenType>{
    const user = await this.userService.create(signupDto)

    return this.login(user)
  }

  async validateUser(email: string, password: string) {
    const candidate = await this.userService.findByEmail(email)

    if (candidate && await bcrypt.compare(password, candidate.password)) {
      return {
        userId: candidate.id,
        email: candidate.email
      }
    }

    return null
  }

  async login(user: any): Promise<AccessTokenType> {
    const payload = { email: user.email, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}