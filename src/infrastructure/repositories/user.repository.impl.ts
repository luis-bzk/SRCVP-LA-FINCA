import { User } from '../../domain/entities';
import { UsersDataSource } from '../../domain/dataSources';
import { UserRepository } from '../../domain/repositories';
import { CreateUserDto, DeleteUserDto, GetUserDto, UpdateUserDto } from '../../domain/dtos';

export class UsersRepositoryImpl implements UserRepository {
  constructor(private readonly usersDataSource: UsersDataSource) {}

  create(createUserDto: CreateUserDto): Promise<{ user: User; password: string }> {
    return this.usersDataSource.create(createUserDto);
  }
  update(updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersDataSource.update(updateUserDto);
  }
  get(getUserDto: GetUserDto): Promise<User> {
    return this.usersDataSource.get(getUserDto);
  }
  getAll(): Promise<User[]> {
    return this.usersDataSource.getAll();
  }
  delete(deleteUserDto: DeleteUserDto): Promise<{}> {
    return this.usersDataSource.delete(deleteUserDto);
  }
}
