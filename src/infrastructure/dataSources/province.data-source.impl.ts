import { ProvinceMapper } from '../mappers';
import { Province } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { ProvincesDataSource } from '../../domain/dataSources';
import { CityModel, CountryModel, ProvinceModel } from '../../data';
import { CreateProvinceDto, DeleteProvinceDto, GetProvinceDto, UpdateProvinceDto } from '../../domain/dtos';

export class ProvincesDataSourceImpl implements ProvincesDataSource {
  constructor() {}

  async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    const { name, id_country } = createProvinceDto;

    try {
      const exists = await ProvinceModel.findOne({ name: name }).lean();
      if (exists) {
        throw CustomError.badRequest('La provincia ya se encuentra registrada.');
      }

      const country = await CountryModel.findById(id_country).lean();
      if (!country) {
        throw CustomError.notFound('El país no se encuentra registrado en el sistema.');
      }

      const province = await ProvinceModel.create({
        name,
        id_country,
      });

      return ProvinceMapper.entityFromObject(province);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async update(updateProvinceDto: UpdateProvinceDto): Promise<Province> {
    const { id, name, id_country } = updateProvinceDto;

    try {
      const exists = await ProvinceModel.findById(id);
      if (!exists) {
        throw CustomError.notFound('La provincia no se encuentra registrada en el sistema.');
      }

      const country = await CountryModel.findById(id_country).lean();
      if (!country) {
        throw CustomError.notFound('El país no se encuentra registrado en el sistema.');
      }

      exists.set({
        name: name,
        id_country: id_country,
      });

      const updated = await exists.save();

      return ProvinceMapper.entityFromObject(updated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async get(getProvinceDto: GetProvinceDto): Promise<Province> {
    const { id } = getProvinceDto;
    try {
      const exists = await ProvinceModel.findById(id);
      if (!exists) {
        throw CustomError.notFound('La provincia no se encuentra registrada en el sistema.');
      }

      return ProvinceMapper.entityFromObject(exists);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getAll(): Promise<Province[]> {
    try {
      const provinces = await ProvinceModel.find();

      return ProvinceMapper.entitiesFromObject(provinces);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async delete(deleteProvinceDto: DeleteProvinceDto): Promise<{}> {
    const { id } = deleteProvinceDto;
    try {
      // find country
      const exists = await ProvinceModel.findById(id).lean();
      if (!exists) throw CustomError.notFound('La provincia no se encuentra registrada en el sistema.');

      // delete cities
      await CityModel.deleteMany({ id_province: id });

      // delete provinces
      await ProvinceModel.deleteOne({ _id: id });

      return {};
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
