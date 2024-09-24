import { InventoryMovement } from '../../Movement_core/entities/InventoryMovement';
import { IInventoryMovementRepository } from '../../Movement_core/repositories/IInventoryMovementRepository';
import { AppDataSource } from './data-source';

export class TypeORMInventoryMovementRepository implements IInventoryMovementRepository {
    async findAll(): Promise<InventoryMovement[]> {
        return await AppDataSource.getRepository(InventoryMovement).find();
    }

    async findById(id: number): Promise<InventoryMovement | null> {
        return await AppDataSource.getRepository(InventoryMovement).findOneBy({ id });
    }

    async create(inventoryMovement: InventoryMovement): Promise<InventoryMovement> {
        const movementRepo = AppDataSource.getRepository(InventoryMovement);
        const newMovement = movementRepo.create(inventoryMovement);
        await movementRepo.save(newMovement);
        return newMovement;
    }

    async update(id: number, inventoryMovement: InventoryMovement): Promise<InventoryMovement | null> {
        const movementRepo = AppDataSource.getRepository(InventoryMovement);
        await movementRepo.update(id, inventoryMovement);
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const movementRepo = AppDataSource.getRepository(InventoryMovement);
        const result = await movementRepo.delete(id);
        return result.affected !== 0;
    }
}
