import { CountryMapper } from '../mappers';
import { Country } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { CountriesDataSource } from '../../domain/dataSources';
import { CityModel, CountryModel, ProvinceModel } from '../../data';
import { CreateCountryDto, DeleteCountryDto, GetCountryDto, UpdateCountryDto } from '../../domain/dtos';

export class CountriesDataSourceImpl implements CountriesDataSource {
  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const { name, code, prefix } = createCountryDto;
    try {
      const exists = await CountryModel.findOne({ name });
      if (exists) throw CustomError.badRequest('El país ya se encuentra registrado dentro del sistema.');

      const country = await CountryModel.create({
        name,
        code,
        prefix,
      });

      return CountryMapper.entityFromObject(country);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async update(updateCountryDto: UpdateCountryDto): Promise<Country> {
    const { id, name, code, prefix } = updateCountryDto;

    try {
      const exists = await CountryModel.findById(id);
      if (!exists) throw CustomError.notFound('El país no se encuentra registrado en el sistema.');

      exists.set({
        name: name,
        code: code,
        prefix: prefix,
      });

      const updated = await exists.save();

      return CountryMapper.entityFromObject(updated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async get(getCountryDto: GetCountryDto): Promise<Country> {
    const { id } = getCountryDto;
    try {
      const exists = await CountryModel.findById(id);
      if (!exists) throw CustomError.notFound('El país no se encuentra registrado en el sistema.');

      return CountryMapper.entityFromObject(exists);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getAll(): Promise<Country[]> {
    try {
      const countries = await CountryModel.find();

      return CountryMapper.entitiesFromObject(countries);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async delete(deleteCountryDto: DeleteCountryDto): Promise<{}> {
    const { id } = deleteCountryDto;

    try {
      // find country
      const exists = await CountryModel.findById(id).lean();
      if (!exists) throw CustomError.notFound('El país no se encuentra registrado en el sistema.');

      // find provinces
      const provinces = await ProvinceModel.find({ id_country: id }).select('_id');

      // delete cities
      await CityModel.deleteMany({ id_province: { $in: provinces } });

      // delete provinces
      await ProvinceModel.deleteMany({ id_country: id });

      // delete country
      await CountryModel.deleteOne({ _id: id });

      return {};
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
