import { User } from '../../User_core/entities/User';

export interface IUserService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: User): Promise<User | null>;
    deleteUser(id: number): Promise<boolean>;
    verifyCredentials(username: string, password: string): Promise<boolean>;
}
