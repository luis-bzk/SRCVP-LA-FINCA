import { Province } from '../../domain/entities';
import { ProvincesDataSource } from '../../domain/dataSources';
import { ProvincesRepository } from '../../domain/repositories';
import { CreateProvinceDto, UpdateProvinceDto, GetProvinceDto, DeleteProvinceDto } from '../../domain/dtos';

export class ProvincesRepositoryImpl implements ProvincesRepository {
  constructor(private readonly provincesDataSource: ProvincesDataSource) {}

  create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    return this.provincesDataSource.create(createProvinceDto);
  }
  update(updateProvinceDto: UpdateProvinceDto): Promise<Province> {
    return this.provincesDataSource.create(updateProvinceDto);
  }
  get(getProvinceDto: GetProvinceDto): Promise<Province> {
    return this.provincesDataSource.get(getProvinceDto);
  }
  getAll(): Promise<Province[]> {
    return this.provincesDataSource.getAll();
  }
  delete(deleteProvinceDto: DeleteProvinceDto): Promise<{}> {
    return this.provincesDataSource.delete(deleteProvinceDto);
  }
}
