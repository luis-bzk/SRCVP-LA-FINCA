import { CompanyModel } from '../../data';
import { CompanyMapper } from '../mappers';
import { Company } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { CompanyDataSource } from '../../domain/dataSources';
import { CreateCompanyDto, DeleteCompanyDto, GetCompanyDto, UpdateCompanyDto } from '../../domain/dtos';

export class CompanyDataSourceImpl implements CompanyDataSource {
  constructor() {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { name, social_reason, email, RUC, phone, cellphone, id_address, domain, schedule, id_user } =
      createCompanyDto;

    try {
      const exists = await CompanyModel.findOne({ RUC: RUC }).lean();
      if (exists) {
        throw CustomError.badRequest('La compañía ya se encuentra registrada dentro del sistema');
      }

      const previousRegistered = await CompanyModel.findOne({ id_user: id_user }).lean();
      if (previousRegistered) {
        throw CustomError.badRequest('El usuario ya posee una compañía registrada dentro del sistema');
      }

      // TODO: VERIFY ADDRESS EXISTS

      const company = await CompanyModel.create({
        name,
        social_reason,
        email,
        RUC,
        phone,
        cellphone,
        id_address,
        domain,
        schedule,
      });

      return CompanyMapper.entityFromObject(company);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async update(updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const { id, name, social_reason, email, RUC, phone, cellphone, id_address, domain, schedule } = updateCompanyDto;

    try {
      const exists = await CompanyModel.findById(id);
      if (!exists) throw CustomError.notFound('La compañía solicitada no se encuentra registrada en el sistema');

      // company with same RUC
      const existsRUC = await CompanyModel.findOne({ RUC: RUC, _id: { $ne: id } }).lean();
      if (existsRUC) throw CustomError.notFound('El RUC empresarial ya se encuentra registrado en el sistema');

      // TODO: VERIFY ADDRESS EXISTS

      // update RUC
      exists.set({
        name,
        social_reason,
        email,
        RUC,
        phone,
        cellphone,
        id_address,
        domain,
        schedule,
      });

      const updated = await exists.save();
      return CompanyMapper.entityFromObject(updated);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async get(getCompanyDto: GetCompanyDto): Promise<Company> {
    const { id } = getCompanyDto;

    try {
      const company = await CompanyModel.findById(id).lean();
      if (!company) throw CustomError.notFound('La compañía solicitada no se encuentra registrada en el sistema');

      return CompanyMapper.entityFromObject(company);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async getAll(): Promise<Company[]> {
    try {
      const companies = await CompanyModel.find().lean();

      return CompanyMapper.entitiesFromObject(companies);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async delete(deleteCompanyDto: DeleteCompanyDto): Promise<{}> {
    const { id } = deleteCompanyDto;

    try {
      const company = await CompanyModel.findById(id).lean();
      if (!company) throw CustomError.notFound('La compañía solicitada no se encuentra registrada en el sistema');

      const deleted = await CompanyModel.deleteOne({ _id: id });
      if (deleted.deletedCount === 0) {
        throw CustomError.notFound('No se pudo eliminar la compañía');
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
