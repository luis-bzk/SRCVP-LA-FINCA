import { User } from '../entities';
import {
  ChangePasswordUserDto,
  CheckTokenUserDto,
  ConfirmUserDto,
  LoginUserDto,
  RegisterUserDto,
  ReqRecoverUserDto,
} from '../dtos';

export abstract class AuthRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<User>;
  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
  abstract reqRecover(reqRecoverUserDto: ReqRecoverUserDto): Promise<User>;
  abstract confirm(confirmUserDto: ConfirmUserDto): Promise<User>;
  abstract checkToken(checkTokenUserDto: CheckTokenUserDto): Promise<User>;
  abstract changePassword(changePasswordUserDto: ChangePasswordUserDto): Promise<User>;
}
