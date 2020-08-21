import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req: any) {
    return req.user;
  }
}