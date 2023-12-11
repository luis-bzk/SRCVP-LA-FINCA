import { AddressModel } from '../../data';
import { AddressMapper } from '../mappers';
import { Address } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { AddressDataSource } from '../../domain/dataSources';
import { CreateAddressDto, DeleteAddressDto, GetAddressDto, UpdateAddressDto } from '../../domain/dtos';

export class AddressDataSourceImpl implements AddressDataSource {
  constructor() {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { id_city, id_country, id_province, main_street, postal_code, secondary_street = '' } = createAddressDto;

    try {
      const address = await AddressModel.create({
        id_city,
        id_country,
        id_province,
        main_street,
        postal_code,
        secondary_street,
      });

      return AddressMapper.entityFromObject(address);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async update(updateAddressDto: UpdateAddressDto): Promise<Address> {
    const { id, id_city, id_country, id_province, main_street, postal_code, secondary_street = '' } = updateAddressDto;

    try {
      const exists = await AddressModel.findById(id);
      if (!exists) throw CustomError.notFound('La dirección solicitada no se encuentra registrada en el sistema');

      exists.set({
        id_city,
        id_country,
        id_province,
        main_street,
        postal_code,
        secondary_street,
      });

      const updated = await exists.save();

      return AddressMapper.entityFromObject(updated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async get(getAddressDto: GetAddressDto): Promise<Address> {
    const { id } = getAddressDto;

    try {
      const exists = await AddressModel.findById(id)
        .populate({ path: 'id_city', select: 'name' })
        .populate({ path: 'id_province', select: 'name' })
        .populate({ path: 'id_country', select: 'name' })
        .lean();
      if (!exists) throw CustomError.notFound('La dirección solicitada no se encuentra registrada en el sistema');

      return AddressMapper.entityFromObject(exists);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async getAll(): Promise<Address[]> {
    try {
      const addresses = await AddressModel.find()
        .populate({ path: 'id_city', select: 'name' })
        .populate({ path: 'id_province', select: 'name' })
        .populate({ path: 'id_country', select: 'name' })
        .lean();
      return AddressMapper.entitiesFromObject(addresses);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async delete(deleteAddressDto: DeleteAddressDto): Promise<{}> {
    const { id } = deleteAddressDto;
    try {
      const exists = await AddressModel.findById(id);
      if (!exists) throw CustomError.notFound('La dirección no se encuentra registrada en el sistema');

      const deleted = await AddressModel.deleteOne({ _id: id });
      if (deleted.deletedCount === 0) throw CustomError.notFound('No se ha podido eliminar la dirección solicitada');

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
