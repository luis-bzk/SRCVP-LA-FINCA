import { CustomError } from '../../domain/errors';
import { PublicUserDataMapper } from '../mappers';
import { PublicUserData } from '../../domain/entities';
import { AddressModel, PublicUserDataModel, UserModel } from '../../data';
import { PublicUserDataDataSource } from '../../domain/dataSources';
import {
  CreatePublicUserDataDto,
  DeletePublicUserDataDto,
  GetPublicUserDataDto,
  UpdatePublicUserDataDto,
} from '../../domain/dtos';

export class PublicUserDataDataSourceImpl implements PublicUserDataDataSource {
  constructor() {}
  async create(createPublicUserDto: CreatePublicUserDataDto): Promise<PublicUserData> {
    const { identification, id_user, id_address, primary_phone, secondary_phone } = createPublicUserDto;
    try {
      const userExist = await PublicUserDataModel.findOne({ id_user }).lean();
      if (userExist) throw CustomError.badRequest('El usuario ya tienen completada su información.');

      const exists = await PublicUserDataModel.findOne({ identification: identification }).lean();
      if (exists) throw CustomError.badRequest('Ya existe un usuario con esa identificación.');

      const user = await UserModel.findById(id_user);
      if (!user) throw CustomError.notFound('El usuario no se encuentra registrado en el sistema.');

      const address = await AddressModel.findById(id_address).lean();
      if (!address) throw CustomError.notFound('La dirección no se encuentra registrada en el sistema.');

      const publicUserData = await PublicUserDataModel.create({
        identification,
        id_user,
        id_address,
        primary_phone,
        secondary_phone,
      });
      return PublicUserDataMapper.entityFromObject(publicUserData);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async update(updatePublicUserDataDto: UpdatePublicUserDataDto): Promise<PublicUserData> {
    const { id, identification, id_user, id_address, primary_phone, secondary_phone } = updatePublicUserDataDto;

    try {
      const exists = await PublicUserDataModel.findById(id);
      if (!exists) {
        throw CustomError.notFound('Los datos publicos del usuario no se encuentra registrada en el sistema.');
      }

      const user = await UserModel.findById(id_user).lean();
      if (!user) {
        throw CustomError.notFound('El usuario no se encuentra registrado en el sistema.');
      }

      //   const address = await AddressModel.findById(id_address).lean();
      //   if (!address) { throw CustomError.badRequest('La dirección no se encuentra registrado en el sistema.');}

      exists.set({
        identification,
        id_user,
        id_address,
        primary_phone,
        secondary_phone,
      });

      const updated = await exists.save();

      return PublicUserDataMapper.entityFromObject(updated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async get(getPublicUserDataDto: GetPublicUserDataDto): Promise<PublicUserData> {
    const { id } = getPublicUserDataDto;
    try {
      const exists = await PublicUserDataModel.findById(id);
      if (!exists)
        throw CustomError.notFound('La información del usuario público solicitado no se encuentra dentro del sistema');

      return PublicUserDataMapper.entityFromObject(exists);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async delete(deletePublicUserDataDto: DeletePublicUserDataDto): Promise<{}> {
    const { id } = deletePublicUserDataDto;

    try {
      //TODO: Eliminar la dirección.
      // const address = await AddressModel.deleteOne({ id_address: id });
      // if (address.deletedCount === 0) {
      //   throw CustomError.notFound('No se pudo eliminar la dirección.');
      // }
      const deletePublicUserData = await PublicUserDataModel.deleteOne({ _id: id });
      if (deletePublicUserData.deletedCount === 0) {
        throw CustomError.notFound('No se pudo eliminar la información del usuario público.');
      }
      return {};
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
