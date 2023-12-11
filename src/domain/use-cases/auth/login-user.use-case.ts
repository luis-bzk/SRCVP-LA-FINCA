import { LoginUserDto } from '../../dtos';
import { CustomError } from '../../errors';
import { JwtAdapter } from '../../../config';
import { AuthRepository } from '../../repositories';

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);

    // token
    const token = await this.signToken({ id: user.id }, '2h');
    if (!token) throw CustomError.internalServer('Error al generar el token');

    return {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
