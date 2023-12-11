import { User } from '../entities';
import { GetUserDto } from '../dtos/user/get-user.dto';
import { UpdateUserDto, CreateUserDto, DeleteUserDto } from '../dtos';

export abstract class UsersDataSource {
  abstract create(createUserDto: CreateUserDto): Promise<{ user: User; password: string }>;
  abstract update(updateUserDto: UpdateUserDto): Promise<User>;
  abstract get(getUserDto: GetUserDto): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract delete(deleteUserDto: DeleteUserDto): Promise<{}>;
}
