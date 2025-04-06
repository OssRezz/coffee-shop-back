import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProductUseCase } from 'src/products/application/use-cases/create-product.use-case';
import { productImageMulterOptions } from 'src/common/helpers/multer-options.helper';
import { deleteUploadedFile } from 'src/common/helpers/delete-uploaded-file.helper';
import { ImageFilePipe } from 'src/common/helpers/image-file.pipe';
import { GetAllProductsUseCase } from 'src/products/application/use-cases/get-all-products.use-case';
import { buildResponse } from 'src/common/helpers/response.helper';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UpdateProductUseCase } from 'src/products/application/use-cases/updated-product.use-case';
import { GetProductByIdUseCase } from 'src/products/application/use-cases/get-product-by-id.use-case';
import { PRODUCT_PATH } from 'src/common/constants/paths';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly getProductsByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Get()
  async getAll() {
    const products = await this.getAllProductsUseCase.execute();
    return buildResponse(products, 'All products');
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', productImageMulterOptions))
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFile(ImageFilePipe) file: Express.Multer.File,
  ) {
    try {
      const product = await this.createProductUseCase.execute({
        ...dto,
        image: file ? file.filename : null,
      });

      return buildResponse(product, 'Product created successfully');
    } catch (error) {
      if (file) deleteUploadedFile(`${PRODUCT_PATH}/${file.filename}`);
      throw error;
    }
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    console.log('➡️ GET /products/:id ejecutado');

    const product = await this.getProductsByIdUseCase.execute(id);
    return buildResponse(product, `Product with id ${id} found`);
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image', productImageMulterOptions))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
    @UploadedFile(ImageFilePipe) file: Express.Multer.File,
  ) {
    const newImage = file ? file.filename : null;

    try {
      const product = await this.updateProductUseCase.execute(id, {
        ...dto,
        image: newImage,
      });

      return buildResponse(product, `Product with id ${id} updated`);
    } catch (error) {
      if (newImage) deleteUploadedFile(`${PRODUCT_PATH}/${newImage}`);
      throw error;
    }
  }

  @Delete('/:id')
  async delete() {
    return {};
  }

  @Patch('/:id')
  async changeStatus() {
    return {};
  }
}
