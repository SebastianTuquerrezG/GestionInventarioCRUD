import { User } from '../../User_core/entities/User';
import { IUserRepository } from '../../User_core/repositories/IUserRepository';
import { AppDataSource } from '../../../config/data-source';
import { Repository } from 'typeorm';

export class TypeORMUserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOneBy({ id });
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { username }
        });
        return user;
    }

    async create(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async update(id: number, user: User): Promise<User | null> {
        const existingUser = await this.findById(id);
        if (!existingUser) return null;
        await this.repository.update(id, user);
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
