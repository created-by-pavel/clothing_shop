import { Body, Controller, Get, Post, Render, Res, UseInterceptors } from "@nestjs/common";
import { ResponseTimeInterceptor } from './interceptor';

import { Response } from 'express';
import { AppService } from './app.service';

@UseInterceptors(ResponseTimeInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world' };
  }

  @Get('/about')
  @Render(`about`)
  getAboutPage() {
    return { message: 'Hello world' };
  }

  // need
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
}
