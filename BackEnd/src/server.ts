import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './Product_module/Product_infrastructure/persistence/data-source';
import { ProductServiceImpl } from './Product_module/Product_service/implementations/ProductServiceImpl';
import { TypeORMProductRepository } from './Product_module/Product_infrastructure/persistence/ORMProductRepository';
import { ProductController } from './Product_module/Product_infrastructure/controllers/ProductController';
import { InventoryMovementController } from './Movement_module/Movement_infrastructure/controllers/InventoryMovementController';
import { InventoryMovementServiceImpl } from './Movement_module/Movement_service/implementations/InventoryMovementServiceImpl';
import { TypeORMInventoryMovementRepository } from './Movement_module/Movement_infrastructure/persistence/ORMInventoryMovementRepository';


AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.json());

    // ConfiguraR CORS
    app.use(cors({
        origin: 'http://localhost:3001', // Permitir solo tu frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
        allowedHeaders: ['Content-Type'] // Headers permitidos
    }));

    const productRepository = new TypeORMProductRepository();
    const productService = new ProductServiceImpl(productRepository);
    const productController = new ProductController(productService);

    const inventoryMovementRepository = new TypeORMInventoryMovementRepository();
    const inventoryMovementService = new InventoryMovementServiceImpl(inventoryMovementRepository);
    const inventoryMovementController = new InventoryMovementController(inventoryMovementService);

    app.get('/products', (req, res) => productController.getAll(req, res));
    app.get('/products/:id', (req, res) => productController.getById(req, res));
    app.post('/products', (req, res) => productController.create(req, res));
    app.put('/products/:id', (req, res) => productController.update(req, res));
    app.delete('/products/:id', (req, res) => productController.delete(req, res));

    app.get('/inventory-movements', (req, res) => inventoryMovementController.getAll(req, res));
    app.get('/inventory-movements/:id', (req, res) => inventoryMovementController.getById(req, res));
    app.post('/inventory-movements', (req, res) => inventoryMovementController.create(req, res));
    app.put('/inventory-movements/:id', (req, res) => inventoryMovementController.update(req, res));
    app.delete('/inventory-movements/:id', (req, res) => inventoryMovementController.delete(req, res));

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(error => console.log(error));
