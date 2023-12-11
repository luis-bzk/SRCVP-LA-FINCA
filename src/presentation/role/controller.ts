import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors';
import { RoleRepository } from '../../domain/repositories';
import { CreateRoleDto, DeleteRoleDto, GetRoleDto, UpdateRoleDto } from '../../domain/dtos';
import { CreateRole, GetAllRoles, GetRole, UpdateRole, DeleteRole } from '../../domain/use-cases';

export class RoleController {
  constructor(private readonly roleRepository: RoleRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createRole = (req: Request, res: Response) => {
    const [error, createRoleDto] = CreateRoleDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateRole(this.roleRepository)
      .execute(createRoleDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateRole = (req: Request, res: Response) => {
    const [error, updateRoleDto] = UpdateRoleDto.create(req.body, req.params.id);
    if (error) return res.status(400).json({ error });

    new UpdateRole(this.roleRepository)
      .execute(updateRoleDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteRole = (req: Request, res: Response) => {
    const [error, deleteRoleDto] = DeleteRoleDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new DeleteRole(this.roleRepository)
      .execute(deleteRoleDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getRole = (req: Request, res: Response) => {
    const [error, getRoleDto] = GetRoleDto.create(req.params.id);
    if (error) return res.status(400).json({ error });

    new GetRole(this.roleRepository)
      .execute(getRoleDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllRoles = (_req: Request, res: Response) => {
    new GetAllRoles(this.roleRepository)
      .execute()
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
