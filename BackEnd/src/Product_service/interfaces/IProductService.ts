import { Product } from "../../Product_core/entities/Product";

export interface IProductService {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(id: number, product: Product): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;
}
