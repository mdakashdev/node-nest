```
@Controller('products')
export class ProductController {

  @Get()
  findAll() {
    return 'All products';
  }

  @Get(':id')
  findOne() {
    return 'Single product';
  }

  @Post()
  create() {
    return 'Product created';
  }

  @Patch(':id')
  update() {
    return 'Product updated';
  }

  @Delete(':id')
  remove() {
    return 'Product deleted';
  }
}
```