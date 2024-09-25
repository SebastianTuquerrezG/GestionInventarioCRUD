import { IInventoryMovementService } from '../interfaces/IInventoryMovementService';
import { IInventoryMovementRepository } from '../../Movement_core/repositories/IInventoryMovementRepository';
import { InventoryMovement } from '../../Movement_core/entities/InventoryMovement';
import { IProductRepository } from '../../../Product_module/Product_core/repositories/IProductRepository';

export class InventoryMovementServiceImpl implements IInventoryMovementService {
    private inventoryMovementRepository: IInventoryMovementRepository;
    private productRepository: IProductRepository;

    constructor(
        inventoryMovementRepository: IInventoryMovementRepository,
        productRepository: IProductRepository) 
        {
        this.inventoryMovementRepository = inventoryMovementRepository;
        this.productRepository = productRepository;
    }

    async getAllMovements(): Promise<InventoryMovement[]> {
        return await this.inventoryMovementRepository.findAll();
    }

    async getMovementById(id: number): Promise<InventoryMovement | null> {
        return await this.inventoryMovementRepository.findById(id);
    }

    async createMovement(movement: InventoryMovement): Promise<InventoryMovement> {
        const product = await this.productRepository.findById(movement.product_id);

        if (!product) {
            throw new Error('Product not found');
        }

        if(movement.movement_type === 'OUT' && product.quantity < movement.quantity) {
            throw new Error('Not enough quantity');
        } else if (movement.movement_type === 'OUT') {
            product.quantity -= movement.quantity;
        } else {
            product.quantity += movement.quantity;
        }

        await this.productRepository.update(product.id, product);
        return await this.inventoryMovementRepository.create(movement);
    }

    async updateMovement(id: number, movement: InventoryMovement): Promise<InventoryMovement | null> {
        const existingMovement = await this.inventoryMovementRepository.findById(id);
        if (!existingMovement) {
            throw new Error('Movement not found');
        }
    
        const productId = Number(existingMovement.product_id);
        if (isNaN(productId)) {
            throw new Error('Invalid product_id');
        }

        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
    
        if (existingMovement.movement_type === 'IN') {
            product.quantity -= existingMovement.quantity;
        } else if (existingMovement.movement_type === 'OUT') {
            product.quantity += existingMovement.quantity;
        }
    
        if (movement.movement_type === 'IN') {
            product.quantity += movement.quantity;
        } else if (movement.movement_type === 'OUT') {
            if (product.quantity < movement.quantity) {
                throw new Error('Insufficient quantity for this product');
            }
            product.quantity -= movement.quantity;
        }
    
        existingMovement.movement_type = movement.movement_type;
        existingMovement.quantity = movement.quantity;
        existingMovement.movement_date = movement.movement_date;
    
        await this.productRepository.update(product.id, product);
        await this.inventoryMovementRepository.update(id, existingMovement);
    
        return existingMovement;
    }
    

    async deleteMovement(id: number): Promise<boolean> {
        return await this.inventoryMovementRepository.delete(id);
    }
}
