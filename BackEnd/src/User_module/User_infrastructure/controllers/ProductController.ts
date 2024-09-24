import { Request, Response } from 'express';
import { IProductService } from '../../User_service/interfaces/IProductService';
import { Product } from '../../User_core/entities/Product';

export class ProductController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const products = await this.productService.getAllProducts();
    res.json(products);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const product = await this.productService.getProductById(Number(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const product: Product = req.body;
    const newProduct = await this.productService.createProduct(product);
    res.status(201).json(newProduct);
  }

  async update(req: Request, res: Response): Promise<void> {
    const product: Product = req.body;
    const updatedProduct = await this.productService.updateProduct(Number(req.params.id), product);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const success = await this.productService.deleteProduct(Number(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
}
