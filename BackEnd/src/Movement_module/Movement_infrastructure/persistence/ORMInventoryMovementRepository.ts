import { InventoryMovement } from '../../Movement_core/entities/InventoryMovement';
import { IInventoryMovementRepository } from '../../Movement_core/repositories/IInventoryMovementRepository';
import { AppDataSource } from '../../../config/data-source';
import { Repository } from 'typeorm';

export class TypeORMInventoryMovementRepository implements IInventoryMovementRepository {
    private repository: Repository<InventoryMovement>;

    constructor() {
        this.repository = AppDataSource.getRepository(InventoryMovement);
    }

    async findAll(): Promise<InventoryMovement[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<InventoryMovement | null> {
        return await this.repository.findOneBy({ id });
    }

    async create(inventoryMovement: InventoryMovement): Promise<InventoryMovement> {
        return await this.repository.save(inventoryMovement);
    }

    async update(id: number, inventoryMovement: InventoryMovement): Promise<InventoryMovement | null> {
        const existingMovement = await this.findById(id);
        if (!existingMovement) return null;
        await this.repository.update(id, inventoryMovement);
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
