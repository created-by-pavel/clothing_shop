import { Size } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Jacket',
    description: 'Product name',
  })
  name: string;
  @ApiProperty({
    example: 'Cool polyester jacket',
    description: 'Product description',
  })
  description: string;
  @ApiProperty({
    example: 'M',
    description: 'Product size',
  })
  size: Size;
  @ApiProperty({
    example: '1999',
    description: 'Product price $',
  })
  price: number;
  @ApiProperty({
    example: '[ https://googledisk/... ]',
    description: 'Product image url',
  })
  images: string[];
}
