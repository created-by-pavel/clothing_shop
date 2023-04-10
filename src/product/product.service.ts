import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

type GetProductParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProductWhereUniqueInput;
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
};

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where,
      include: {
        images: true,
      },
    });
  }

  async getAll(params: GetProductParams) {
    const { skip, take } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      include: {
        images: true,
      },
    });
  }

  async createProduct(newProduct: CreateProductDto): Promise<Product> {
    const { name, description, size, price, images } = newProduct;
    return await this.prisma.product.create({
      data: {
        name,
        description,
        size,
        price,
        images: {
          createMany: {
            data: images.map((image) => ({
              imageUrl: image,
            })),
          },
        },
      },
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    return this.prisma.product.update(params);
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({ where });
  }

  async deleteProducts() {
    await this.prisma.$transaction(async (prisma) => {
      // Delete all images associated with each product
      const products = await prisma.product.findMany();
      for (const product of products) {
        await prisma.image.deleteMany({
          where: { productId: product.id },
        });
      }

      // Delete all products
      await prisma.product.deleteMany();
    });
  }
}
