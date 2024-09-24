import { DataSource } from 'typeorm';
import { Product } from '../../User_core/entities/Product';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'tomy2765',
    database: 'inventario',
    synchronize: true,
    logging: false,
    entities: [Product],
    migrations: [],
    subscribers: [],
});
