import { DataSource } from 'typeorm';
import { Product } from '../Product_module/Product_core/entities/Product';
import { InventoryMovement } from '../Movement_module/Movement_core/entities/InventoryMovement';
import { User } from '../User_module/User_core/entities/User';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'tomy2765',
    database: 'inventario',
    synchronize: true,  // Solo para desarrollo, no en producción
    logging: false,
    entities: [Product, InventoryMovement, User],  // Incluye todas las entidades
    migrations: [],
    subscribers: [],
});
