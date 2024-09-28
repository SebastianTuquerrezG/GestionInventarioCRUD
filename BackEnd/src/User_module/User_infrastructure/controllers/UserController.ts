import { Request, Response } from 'express';
import { IUserService } from '../../User_service/interfaces/IUserService';
import { User } from '../../User_core/entities/User';
import createAccessToken from '../../../libs/jwt';

interface Credentials {
  isValid: boolean;
  user: User,
}

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
      try {
        const newUser: User = req.body;
        const result = await this.userService.createUser(newUser);
        console.log(`User registered: Username ${newUser.username}, Role ${newUser.role}`);
        res.status(201).json(result);
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    }

    async update(req: Request, res: Response): Promise<void> {
      try {
        const id = parseInt(req.params.id);
        const updatedUser: User = req.body;
        const result = await this.userService.updateUser(id, updatedUser);
        console.log(`User updated: ID ${id}, Username ${updatedUser.username}, Role ${updatedUser.role}`);
        res.status(200).json(result);
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    }

    async delete(req: Request, res: Response): Promise<void> {
      try {
        const id = parseInt(req.params.id);
        await this.userService.deleteUser(id);
        console.log(`User deleted: ID ${id}`);
        res.status(204).send();
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        } else {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    }

    async verifyLogin(req: Request, res: Response) {
      const { username, password } = req.body;
      try {
          const credentials: Credentials = await this.userService.verifyCredentials(username, password) as Credentials;
          if (credentials.isValid && credentials.user) {
              const token = await createAccessToken({ id: credentials.user.id });  
              console.log('User verified');     
              res.status(200).json({ 
                id: credentials.user.id,
                username: credentials.user.username,
                role: credentials.user.role,
                success: true, 
                message: 'Login successful', 
                token: token
              });
          } else {
              res.status(401).json({ success: false, message: 'Invalid username or password', token: null });
          }
      } catch (error) {
          res.status(500).json({ success: false, message: 'Invalid username or password', token: null});
      }
  }
}
