import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module(
  {
  imports: [
    JwtModule.register({
      secret: 'rahasia-super-kuat',
      signOptions: {expiresIn: '0.5h'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
