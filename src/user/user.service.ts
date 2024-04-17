import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import {Role} from '@prisma/client';
import { LoginUserDTO } from "./dto/login-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    const { name, secondName, email, password, birthday} = newUser;
    return await this.prisma.user.create({
      data: {
        name,
        secondName,
        email,
        password,
        orders: undefined,
        role: Role.USER
      }
    });
  }

  async loginUser(userData: LoginUserDTO): Promise<User> {
    const { email, password } = userData;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatches = password == user.password;
    if (!passwordMatches) {
      throw new Error('Incorrect password');
    }
    return user;
  }
}
