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
        try{
            const movement: InventoryMovement = req.body;
            const newMovement = await this.inventoryMovementService.createMovement(movement);
            console.log(`Movement registered: Product ID ${newMovement.product_id}, Type ${newMovement.movement_type}, Quantity ${newMovement.quantity}`);
            res.status(201).json(newMovement);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });                
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try{
            const movement: InventoryMovement = req.body;
            const updatedMovement = await this.inventoryMovementService.updateMovement(Number(req.params.id), movement);
            if (updatedMovement) {
                console.log(`Movement updated: ID ${Number(req.params.id)}, Product ID ${updatedMovement.product_id}, Type ${updatedMovement.movement_type}, Quantity ${updatedMovement.quantity}`);
                res.status(200).json(updatedMovement);
            } else {
                res.status(404).json({ message: 'Movement not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });                
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const success = await this.inventoryMovementService.deleteMovement(Number(req.params.id));
        if (success) {
            console.log(`Movement deleted: ID ${Number(req.params.id)}`);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Movement not found' });
        }
    }
}