import { User } from '../entities';
import {
  LoginUserDto,
  RegisterUserDto,
  ReqRecoverUserDto,
  CheckTokenUserDto,
  ConfirmUserDto,
  ChangePasswordUserDto,
} from '../dtos';

export abstract class AuthDataSource {
  abstract login(loginUserDto: LoginUserDto): Promise<User>;
  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
  abstract reqRecover(reqRecoverUserDto: ReqRecoverUserDto): Promise<User>;
  abstract confirmUser(confirmUserDto: ConfirmUserDto): Promise<User>;
  abstract checkToken(checkTokenUserDto: CheckTokenUserDto): Promise<User>;
  abstract changePassword(changePasswordUserDto: ChangePasswordUserDto): Promise<User>;
}
