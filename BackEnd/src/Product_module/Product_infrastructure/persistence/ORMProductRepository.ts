import { IProductRepository } from "../../Product_core/repositories/IProductRepository";
import { Product } from "../../Product_core/entities/Product";
import { Repository } from "typeorm";
import { AppDataSource } from '../../../config/data-source';

export class TypeORMProductRepository implements IProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Product | null> {
    return await this.repository.findOneBy({ id });
  }

  async create(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }

  async update(id: number, product: Product): Promise<Product | null> {
    const existingProduct = await this.findById(id);
    if (!existingProduct) return null;

    const updatedProduct = await this.repository.merge(existingProduct, product);

    return await this.repository.save(updatedProduct);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
