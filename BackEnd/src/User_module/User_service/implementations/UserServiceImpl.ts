import { IUserService } from '../interfaces/IUserService';
import { IUserRepository } from '../../User_core/repositories/IUserRepository';
import { User } from '../../User_core/entities/User';

export class UserServiceImpl implements IUserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

    async updateUser(id: number, user: User): Promise<User | null> {
        return await this.userRepository.update(id, user);
    }

    async deleteUser(id: number): Promise<boolean> {
        return await this.userRepository.delete(id);
    }
}
