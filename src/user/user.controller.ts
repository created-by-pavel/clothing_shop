import { Body, Controller, Delete, Get, Param, Post, Render, Res } from "@nestjs/common";
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200, description: 'Signed up' })
  @Post('/signUp')
  async signUp(@Body() userData: User): Promise<User> {
    return this.userService.createUser(userData);
  }

  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: 200, description: 'Logged in' })
  @Post('/login')
  async login(@Body() userData: User): Promise<User> {
    return this.userService.loginUser(userData);
  }
}
