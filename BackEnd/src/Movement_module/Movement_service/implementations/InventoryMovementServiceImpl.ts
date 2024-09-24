import { IInventoryMovementService } from '../interfaces/IInventoryMovementService';
import { IInventoryMovementRepository } from '../../Movement_core/repositories/IInventoryMovementRepository';
import { InventoryMovement } from '../../Movement_core/entities/InventoryMovement';

export class InventoryMovementServiceImpl implements IInventoryMovementService {
    private inventoryMovementRepository: IInventoryMovementRepository;

    constructor(inventoryMovementRepository: IInventoryMovementRepository) {
        this.inventoryMovementRepository = inventoryMovementRepository;
    }

    async getAllMovements(): Promise<InventoryMovement[]> {
        return await this.inventoryMovementRepository.findAll();
    }

    async getMovementById(id: number): Promise<InventoryMovement | null> {
        return await this.inventoryMovementRepository.findById(id);
    }

    async createMovement(movement: InventoryMovement): Promise<InventoryMovement> {
        return await this.inventoryMovementRepository.create(movement);
    }

    async updateMovement(id: number, movement: InventoryMovement): Promise<InventoryMovement | null> {
        return await this.inventoryMovementRepository.update(id, movement);
    }

    async deleteMovement(id: number): Promise<boolean> {
        return await this.inventoryMovementRepository.delete(id);
    }
}
