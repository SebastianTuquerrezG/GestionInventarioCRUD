import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './Product_infrastructure/persistence/data-source';
import { ProductServiceImpl } from './Product_service/implementations/ProductServiceImpl';
import { TypeORMProductRepository } from './Product_infrastructure/persistence/ORMProductRepository';
import { ProductController } from './Product_infrastructure/controllers/ProductController';

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.json());

    const productRepository = new TypeORMProductRepository();
    const productService = new ProductServiceImpl(productRepository);
    const productController = new ProductController(productService);

    app.get('/products', (req, res) => productController.getAll(req, res));
    app.get('/products/:id', (req, res) => productController.getById(req, res));
    app.post('/products', (req, res) => productController.create(req, res));
    app.put('/products/:id', (req, res) => productController.update(req, res));
    app.delete('/products/:id', (req, res) => productController.delete(req, res));

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(error => console.log(error));
