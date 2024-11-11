import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto;

    const newProduct = new Product(uuidv4(), name, description, price);
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string): Product {
    const productFound = this.products.find((product) => product.id === id);
    return productFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    this.products.map((product) => {
      if (product.id === id) {
        product = Object.assign(product, updateProductDto);
        return;
      }
    });
  }

  remove(id: string) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
