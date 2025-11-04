import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    if (username === 'fahry' && password === '123456') {
        const payload= {username}
        const token= this.jwtService.sign(payload)
      return {
        status: 'Success',
        massage: 'Login Berhasil',
        token,
      };
    } else {
      return { 
        status: 'error',
        massage: 'username atau password salah',
    };
    }
  }
}
