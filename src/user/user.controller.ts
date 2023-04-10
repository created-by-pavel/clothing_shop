import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register a new User' })
  @ApiResponse({ status: 200, description: 'User is registered' })
  @Post('/register')
  async registerUser(@Body() userData: User): Promise<User> {
    return this.userService.createUser(userData);
  }

  @ApiOperation({ summary: 'Delete User by Id' })
  @ApiResponse({ status: 200, description: 'User is deleted' })
  @Delete('/delete')
  async deleteUser(@Param() params, @Res() response) {
    await this.userService.deleteUser({
      id: Number(params.id),
    });
    return response.redirect('/index');
  }
}
