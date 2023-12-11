import { User } from '../entities';
import { CreateUserDto, DeleteUserDto, GetUserDto, UpdateUserDto } from '../dtos';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<{ user: User; password: string }>;
  abstract update(updateUserDto: UpdateUserDto): Promise<User>;
  abstract get(getUserDto: GetUserDto): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract delete(deleteUserDto: DeleteUserDto): Promise<{}>;
}
