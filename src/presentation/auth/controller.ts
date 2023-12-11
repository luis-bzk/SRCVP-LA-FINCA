import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { AuthRepository } from '../../domain/repositories';
import { EmailGateway } from '../../infrastructure/gateways';
import { ConfirmUserDto } from '../../domain/dtos/auth/confirm-user.dto';
import {
  LoginUser,
  RegisterUser,
  ReqRecoverUser,
  ConfirmUser,
  ChangePasswordUser,
  CheckTokenUser,
} from '../../domain/use-cases';
import {
  ChangePasswordUserDto,
  CheckTokenUserDto,
  LoginUserDto,
  RegisterUserDto,
  ReqRecoverUserDto,
} from '../../domain/dtos';

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then(async (data) => {
        await EmailGateway.sendEmailVerifyAccount({
          email: data.email,
          lastName: data.lastName,
          name: data.name,
          token: data.token,
        });

        return res.status(201).json(data);
      })
      .catch((error) => this.handleError(error, res));
  };

  reqRecover = (req: Request, res: Response) => {
    const [error, reqRecoverUserDto] = ReqRecoverUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new ReqRecoverUser(this.authRepository)
      .execute(reqRecoverUserDto!)
      .then(async (data) => {
        await EmailGateway.sendEmailRecoverPassword({
          email: data.email,
          lastName: data.lastName,
          name: data.name,
          token: data.token,
        });

        return res.status(200).json(data);
      })
      .catch((error) => this.handleError(error, res));
  };

  confirmUser = (req: Request, res: Response) => {
    const [error, confirmUserDto] = ConfirmUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new ConfirmUser(this.authRepository)
      .execute(confirmUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  checkToken = (req: Request, res: Response) => {
    const [error, checkTokenUserDto] = CheckTokenUserDto.create(req.params.token);
    if (error) return res.status(400).json({ error });

    new CheckTokenUser(this.authRepository)
      .execute(checkTokenUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  changePassword = (req: Request, res: Response) => {
    const [error, updateUserDto] = ChangePasswordUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new ChangePasswordUser(this.authRepository)
      .execute(updateUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
