import { Product } from "../entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: number, product: Product): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
}
