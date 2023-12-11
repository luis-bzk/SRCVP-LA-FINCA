import { UserMapper } from '../mappers';
import { BcryptAdapter } from '../../config';
import { User } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { RoleModel, UserModel } from '../../data';
import { UsersDataSource } from '../../domain/dataSources';
import { generatePassword, tokenGenerator } from '../../utils';
import { CreateUserDto, DeleteUserDto, GetUserDto, UpdateUserDto } from '../../domain/dtos';

type HashFunction = (password: string) => string;

export class UsersDataSourceImpl implements UsersDataSource {
  constructor(private readonly hashPassword: HashFunction = BcryptAdapter.hash) {}

  async create(createUserDto: CreateUserDto): Promise<{ user: User; password: string }> {
    const { name, lastName, email } = createUserDto;
    try {
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('Ya existe un usuario registrado con el correo electrónico');

      const role = await RoleModel.findOne({ name: 'AFFILIATE' });
      if (!role) throw CustomError.notFound('No existen los recursos necesarios para continuar con este proceso');

      const password = generatePassword();

      const user = await UserModel.create({
        email,
        name,
        lastName,
        password: this.hashPassword(password),
        state: 'NOT_CONFIRMED',
        id_role: role._id,
        token: tokenGenerator(),
      });

      // TODO: CREATE MEMBERSHIP

      return { user: UserMapper.userEntityFromObject(user), password };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, name, lastName, email } = updateUserDto;
    try {
      const user = await UserModel.findById(id);
      if (!user) throw CustomError.notFound('El usuario no existe o no esta registrado.');

      const emailExists = await UserModel.findOne({ email, _id: { $ne: id } });
      if (emailExists) throw CustomError.notFound('Ya existe un usuario con el email deseado');

      user.set({
        name,
        lastName,
        email,
      });

      const userUpdate = await user.save();
      return UserMapper.userEntityFromObject(userUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async get(getUserDto: GetUserDto): Promise<User> {
    const { id } = getUserDto;
    try {
      const exists = await UserModel.findById(id);
      if (!exists) throw CustomError.notFound('El usuario solicitado no existe');

      return UserMapper.userEntityFromObject(exists);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await UserModel.find();
      return UserMapper.userEntitiesFromObject(users);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<{}> {
    const { id } = deleteUserDto;
    try {
      const exists = await UserModel.findById(id);
      if (!exists) {
        throw CustomError.badRequest('El usuario no se encuentra registrado en el sistema.');
      }

      // TODO: DELETE CUSTOMER | USER DATA

      const deleteUser = await UserModel.deleteOne({ _id: id });
      if (deleteUser.deletedCount === 0) {
        throw CustomError.notFound('No se pudo eliminar el usuario.');
      }

      return {};
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }
}
