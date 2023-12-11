import { CityModel } from '../../data';
import { CityMapper } from '../mappers';
import { City } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { CityDataSource } from '../../domain/dataSources';
import { CreateCityDto, DeleteCityDto, GetCityDto, UpdateCityDto } from '../../domain/dtos';

export class CityDataSourceImpl implements CityDataSource {
  async create(createCityDto: CreateCityDto): Promise<City> {
    const { id_province, name } = createCityDto;

    try {
      const exists = await CityModel.findOne({ name }).lean();
      if (exists) throw CustomError.badRequest('La ciudad ya se encuentra registrada en el sistema.');

      const city = await CityModel.create({
        id_province,
        name,
      });
      return CityMapper.entityFromObject(city);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async update(updateCityDto: UpdateCityDto): Promise<City> {
    const { id, id_province, name } = updateCityDto;

    try {
      const exists = await CityModel.findById(id);
      if (!exists) throw CustomError.notFound('La ciudad no se encuentra registrada en el sistema.');

      const nameExists = await CityModel.findOne({ _id: { $ne: id }, name }).lean();
      if (nameExists) throw CustomError.badRequest('El nombre ya se encuentra registrado.');

      exists.set({
        id_province: id_province,
        name: name,
      });

      const updated = await exists.save();

      return CityMapper.entityFromObject(updated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async get(getCityDto: GetCityDto): Promise<City> {
    const { id } = getCityDto;
    try {
      const exists = await CityModel.findById(id).lean();
      if (!exists) throw CustomError.notFound('La ciudad no se encuentra registrada en el sistema.');

      return CityMapper.entityFromObject(exists);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async getAll(): Promise<City[]> {
    try {
      const cities = await CityModel.find().lean();
      return CityMapper.entitiesFromObject(cities);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async delete(deleteCityDto: DeleteCityDto): Promise<{}> {
    const { id } = deleteCityDto;
    try {
      const exists = await CityModel.findById(id).lean();
      if (!exists) throw CustomError.notFound('La ciudad no se encuentra registrada en el sistema.');

      const deleted = await CityModel.deleteOne({ _id: id });
      if (deleted.deletedCount === 0) {
        throw CustomError.internalServer('No se ha podido eliminar la ciudad solicitada.');
      }

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
