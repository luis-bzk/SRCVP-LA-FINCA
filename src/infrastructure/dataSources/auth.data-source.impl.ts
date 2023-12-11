import { UserMapper } from '../mappers';
import { BcryptAdapter } from '../../config';
import { tokenGenerator } from '../../utils';
import { User } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { RoleModel, UserModel } from '../../data';
import { AuthDataSource } from '../../domain/dataSources';
import {
  ChangePasswordUserDto,
  CheckTokenUserDto,
  ConfirmUserDto,
  LoginUserDto,
  RegisterUserDto,
  ReqRecoverUserDto,
} from '../../domain/dtos';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.badRequest('El usuario o contraseña es incorrecto');

      const isMatching = this.comparePassword(password, user.password);
      if (!isMatching) throw CustomError.badRequest('El usuario o contraseña es incorrecto');

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, lastName, email, password } = registerUserDto;

    try {
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('El usuario ya se encuentra registrado dentro del sistema');

      const role = await RoleModel.findOne({ name: 'PUBLIC' });
      if (!role) throw CustomError.notFound('No existen los recursos necesarios para continuar con este proceso');

      // hash password
      const user = await UserModel.create({
        name,
        lastName,
        email,
        password: this.hashPassword(password),
        state: 'NOT_CONFIRMED',
        id_role: role._id,
        token: tokenGenerator(),
      });

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async reqRecover(reqRecoverUserDto: ReqRecoverUserDto): Promise<User> {
    const { email } = reqRecoverUserDto;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.notFound('El usuario no se encuentra registrado dentro del sistema');

      // hash password
      user.set({
        token: tokenGenerator(),
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

  async confirmUser(confirmUserDto: ConfirmUserDto): Promise<User> {
    const { token } = confirmUserDto;
    try {
      const user = await UserModel.findOne({ token });
      if (!user) throw CustomError.notFound('No se ha encontrado el token.');
      if (user.token === '') throw CustomError.badRequest('Ya se ha confirmado la cuenta.');

      user.set({
        token: '',
        state: 'CONFIRMED',
      });

      const userConfirm = await user.save();
      return UserMapper.userEntityFromObject(userConfirm);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async checkToken(checkTokenUserDto: CheckTokenUserDto): Promise<User> {
    const { token } = checkTokenUserDto;
    try {
      const user = await UserModel.findOne({ token });
      if (!user) throw CustomError.notFound('No se ha encontrado el token.');
      if (user.token === '') throw CustomError.badRequest('Ya se ha confirmado la cuenta.');

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async changePassword(changePasswordUserDto: ChangePasswordUserDto): Promise<User> {
    const { password, token } = changePasswordUserDto;

    try {
      const user = await UserModel.findOne({ token });
      if (!user) throw CustomError.notFound('El token ingresado es invalido');

      user.token = '';
      user.password = password;
      const userUpdated = await user.save();

      return UserMapper.userEntityFromObject(userUpdated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
