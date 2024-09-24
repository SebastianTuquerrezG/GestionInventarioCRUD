import { DataSource } from 'typeorm';
import { InventoryMovement } from '../../Movement_core/entities/InventoryMovement';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'tomy2765',
    database: 'inventario',
    synchronize: true,
    logging: false,
    entities: [InventoryMovement],
    migrations: [],
    subscribers: [],
});
