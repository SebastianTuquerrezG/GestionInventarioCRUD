import { Request, Response } from 'express';
import { IUserService } from '../../User_service/interfaces/IUserService';
import { User } from '../../User_core/entities/User';

export class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const user = await this.userService.getUserById(Number(req.params.id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        const newUser = await this.userService.createUser(user);
        res.status(201).json(newUser);
    }

    async update(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        const updatedUser = await this.userService.updateUser(Number(req.params.id), user);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const success = await this.userService.deleteUser(Number(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}
