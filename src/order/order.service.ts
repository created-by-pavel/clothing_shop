import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Order, Status } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';

type GetOrderParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.OrderWhereUniqueInput;
  where?: Prisma.OrderWhereInput;
  orderBy?: Prisma.OrderOrderByWithRelationInput;
};

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(newOrder: CreateOrderDto): Promise<Order> {
    const { products, ...orderData } = newOrder;
    const productIds = products.map((productId) => ({ id: productId }));
    return await this.prisma.order.create({
      data: {
        ...orderData,
        status: Status.WAITING_FOR_DISPATCH,
        products: {
          connect: productIds,
        },
      },
    });
  }

  async getById(where: Prisma.OrderWhereUniqueInput): Promise<Order | null> {
    return this.prisma.order.findUnique({ where });
  }

  async getAll(params: GetOrderParams) {
    return this.prisma.order.findMany({
      include: {
        products: true,
      },
    });
  }

  async deleteOrders() {
    await this.prisma.$transaction(async (prisma) => {
      // Delete all products
      await prisma.order.deleteMany();
    });
  }
}
