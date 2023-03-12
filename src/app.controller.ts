import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { ResponseTimeInterceptor } from './interceptor';

import { Response } from 'express';
import { AppService } from './app.service';

@UseInterceptors(ResponseTimeInterceptor)
@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world' };
  }

  @Get('/store')
  @Render(`store`)
  getStorePage() {
    return { message: 'Hello world' };
  }

  @Get('/profile')
  @Render(`profile`)
  getProfilePage() {
    return { message: 'Hello world' };
  }

  @Get('/about')
  @Render(`about`)
  getAboutPage() {
    return { message: 'Hello world' };
  }

  @Get('/addProduct')
  @Render(`addProduct`)
  getAddProductPage() {
    return { message: 'Hello world' };
  }

  @Get('/cart')
  @Render(`cart`)
  getCartPage() {
    return { message: 'Hello world' };
  }

  @Get('/contact')
  @Render(`contact`)
  getContactPage() {
    return { message: 'Hello world' };
  }

  @Get('/login')
  @Render(`login`)
  getLoginPage() {
    return { message: 'Hello world' };
  }
}
