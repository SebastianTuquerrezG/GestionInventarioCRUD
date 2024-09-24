import { IProductService } from "../interfaces/IProductService";
import { IProductRepository } from "../../Product_core/repositories/IProductRepository";
import { Product } from "../../Product_core/entities/Product";

export class ProductServiceImpl implements IProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }

  async createProduct(product: Product): Promise<Product> {
    return await this.productRepository.create(product);
  }

  async updateProduct(id: number, product: Product): Promise<Product | null> {
    return await this.productRepository.update(id, product);
  }

  async deleteProduct(id: number): Promise<boolean> {
    return await this.productRepository.delete(id);
  }
}
