import { InventoryMovement } from '../../Movement_core/entities/InventoryMovement';

export interface IInventoryMovementService {
    getAllMovements(): Promise<InventoryMovement[]>;
    getMovementById(id: number): Promise<InventoryMovement | null>;
    createMovement(movement: InventoryMovement): Promise<InventoryMovement>;
    updateMovement(id: number, movement: InventoryMovement): Promise<InventoryMovement | null>;
    deleteMovement(id: number): Promise<boolean>;
}
