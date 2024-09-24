import { User } from '../entities/User';

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(id: number, user: User): Promise<User | null>;
    delete(id: number): Promise<boolean>;
}
