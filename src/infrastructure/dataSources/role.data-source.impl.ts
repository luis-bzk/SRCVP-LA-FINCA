import { RoleModel } from '../../data';
import { RoleMapper } from '../mappers';
import { Role } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { RolesDataSource } from '../../domain/dataSources';
import { CreateRoleDto, DeleteRoleDto, GetRoleDto, UpdateRoleDto } from '../../domain/dtos';

export class RolesDataSourceImpl implements RolesDataSource {
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name } = createRoleDto;

    try {
      const exists = await RoleModel.findOne({ name });
      if (exists) throw CustomError.badRequest('El rol ya se encuentra registrado dentro del sistema');

      const role = await RoleModel.create({
        name,
      });

      return RoleMapper.entityFromObject(role);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async update(updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { id, name } = updateRoleDto;

    try {
      const exists = await RoleModel.findById(id);
      if (!exists) throw CustomError.notFound('El rol solicitado no se encuentra dentro del sistema');

      exists.set({
        name: name,
      });

      const updated = await exists.save();

      return RoleMapper.entityFromObject(updated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async delete(deleteRoleDto: DeleteRoleDto): Promise<{}> {
    const { id } = deleteRoleDto;

    try {
      const deleteRole = await RoleModel.deleteOne({ _id: id });
      if (deleteRole.deletedCount === 0) {
        throw CustomError.notFound('No se pudo eliminar el role.');
      }

      return {};
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async get(getRoleDto: GetRoleDto): Promise<Role> {
    const { id } = getRoleDto;

    try {
      const exists = await RoleModel.findById(id);
      if (!exists) throw CustomError.notFound('El rol solicitado no se encuentra dentro del sistema');

      return RoleMapper.entityFromObject(exists);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getAll(): Promise<Role[]> {
    try {
      const roles = await RoleModel.find();

      return RoleMapper.entitiesFromObject(roles);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
