import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { UserRepository } from '../../domain/repositories';
import { EmailGateway } from '../../infrastructure/gateways';
import { CreateUserDto, DeleteUserDto, GetUserDto, UpdateUserDto } from '../../domain/dtos';
import { CreateUser, DeleteUser, GetAllUsers, GetUser, UpdateUser } from '../../domain/use-cases';

export class UsersController {
  constructor(private readonly usersRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createUser = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateUser(this.usersRepository)
      .execute(createUserDto!)
      .then(async (data) => {
        await EmailGateway.sendEmailVerifyAccountCustomer({
          email: data.user.email,
          lastName: data.user.lastName,
          name: data.user.name,
          token: data.user.token,
          temporalPassword: data.password,
        });

        return res.status(201).json(data.user);
      })
      .catch((error) => this.handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const [error, updateUserDto] = UpdateUserDto.create(req.body, req.params.id);
    if (error) return res.status(400).json({ error });

    new UpdateUser(this.usersRepository)
      .execute(updateUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUser = (req: Request, res: Response) => {
    const [error, getUserDto] = GetUserDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new GetUser(this.usersRepository)
      .execute(getUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllUsers = (_req: Request, res: Response) => {
    new GetAllUsers(this.usersRepository)
      .execute()
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteUser = (req: Request, res: Response) => {
    const [error, deleteUserDto] = DeleteUserDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new DeleteUser(this.usersRepository)
      .execute(deleteUserDto!)
      .then((data) => res.status(204).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
