import { Request, Response } from 'express';
import { IProductService } from '../../Product_service/interfaces/IProductService';
import { Product } from '../../Product_core/entities/Product';

export class ProductController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      console.log(`Fetched ${products.length} products.`);
      res.json(products);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const product = await this.productService.getProductById(Number(req.params.id));
      if (product) {
        console.log(`Fetched product: ID ${product.id}, Name ${product.name}`);
        res.json(product);
      } else {
        console.log(`Product not found: ID ${req.params.id}`);
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const product: Product = req.body;
      const newProduct = await this.productService.createProduct(product);
      console.log(`Product created: ID ${newProduct.id}, Name ${newProduct.name}`);
      res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const product: Product = req.body;
      const updatedProduct = await this.productService.updateProduct(Number(req.params.id), product);
      if (updatedProduct) {
        console.log(`Product updated: ID ${updatedProduct.id}, Name ${updatedProduct.name}`);
        res.json(updatedProduct);
      } else {
        console.log(`Product not found for update: ID ${req.params.id}`);
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.productService.deleteProduct(Number(req.params.id));
      if (success) {
        console.log(`Product deleted: ID ${req.params.id}`);
        res.status(204).send();
      } else {
        console.log(`Product not found for deletion: ID ${req.params.id}`);
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}
