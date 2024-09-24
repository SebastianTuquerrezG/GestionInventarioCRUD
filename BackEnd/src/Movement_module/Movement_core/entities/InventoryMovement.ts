import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('inventory_movements')
export class InventoryMovement {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    product_id!: number;

    @Column({ type: 'enum', enum: ['IN', 'OUT'] })
    movement_type!: 'IN' | 'OUT';

    @Column({ type: 'int' })
    quantity!: number;

    @CreateDateColumn()
    movement_date!: Date; // Esta columna se llenará automáticamente
}
