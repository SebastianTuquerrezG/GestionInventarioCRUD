import { InventoryMovement } from '../entities/InventoryMovement';

export interface IInventoryMovementRepository {
    findAll(): Promise<InventoryMovement[]>;
    findById(id: number): Promise<InventoryMovement | null>;
    create(inventoryMovement: InventoryMovement): Promise<InventoryMovement>;
    update(id: number, inventoryMovement: InventoryMovement): Promise<InventoryMovement | null>;
    delete(id: number): Promise<boolean>;
}
