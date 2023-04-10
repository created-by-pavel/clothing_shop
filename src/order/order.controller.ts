import { Body, Controller, Delete, Get, Post, Render } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Render Order Form' })
  @ApiResponse({ status: 200, description: 'Page rendered' })
  @Get('/order-form')
  @Render('orderForm.hbs')
  async getOrderForm() {
    return { message: 'Hello world' };
  }

  @ApiOperation({ summary: 'Add new Order' })
  @ApiResponse({ status: 200, description: 'Order is added' })
  @Post('/new')
  async addOrder(@Body() newOrder: CreateOrderDto) {
    console.log(newOrder);
    await this.orderService.createOrder(newOrder);
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Get all orders json form' })
  @Get('/all-orders')
  async getProducts(): Promise<Order[] | null> {
    return await this.orderService.getAll({
      take: 16,
    });
  }

  @ApiOperation({ summary: 'Delete all orders' })
  @ApiResponse({ status: 200, description: 'Orders are deleted' })
  @Delete('/')
  async deleteAllProducts() {
    await this.orderService.deleteOrders();
  }

  // @ApiOperation({ summary: 'Get order by id' })
  // @ApiResponse({ status: 200, description: 'Page rendered' })
  // @Get(':id')
  // @Render('order.hbs')
  // async getOrder(@Param('id') id: string) {
  //   const order = await this.orderService.getById({
  //     id: Number(id),
  //   });
  //   return { order };
  // }
}
