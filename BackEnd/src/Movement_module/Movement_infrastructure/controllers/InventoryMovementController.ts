import { Request, Response } from 'express';
import { IInventoryMovementService } from '../../Movement_service/interfaces/IInventoryMovementService';
import { InventoryMovement } from '../../Movement_core/entities/InventoryMovement';

export class InventoryMovementController {
    private inventoryMovementService: IInventoryMovementService;

    constructor(inventoryMovementService: IInventoryMovementService) {
        this.inventoryMovementService = inventoryMovementService;
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const movements = await this.inventoryMovementService.getAllMovements();
        res.json(movements);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const movement = await this.inventoryMovementService.getMovementById(Number(req.params.id));
        if (movement) {
            res.json(movement);
        } else {
            res.status(404).json({ message: 'Movement not found' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const movement: InventoryMovement = req.body;
        const newMovement = await this.inventoryMovementService.createMovement(movement);
        res.status(201).json(newMovement);
    }

    async update(req: Request, res: Response): Promise<void> {
        const movement: InventoryMovement = req.body;
        const updatedMovement = await this.inventoryMovementService.updateMovement(Number(req.params.id), movement);
        if (updatedMovement) {
            res.json(updatedMovement);
        } else {
            res.status(404).json({ message: 'Movement not found' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const success = await this.inventoryMovementService.deleteMovement(Number(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Movement not found' });
        }
    }
}