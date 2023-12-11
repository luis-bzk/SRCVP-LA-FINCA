import { Province } from '../entities';
import { CreateProvinceDto, DeleteProvinceDto, GetProvinceDto, UpdateProvinceDto } from '../dtos';

export abstract class ProvincesDataSource {
  abstract create(createProvinceDto: CreateProvinceDto): Promise<Province>;
  abstract update(updateProvinceDto: UpdateProvinceDto): Promise<Province>;
  abstract get(GetProvinceDto: GetProvinceDto): Promise<Province>;
  abstract getAll(): Promise<Province[]>;
  abstract delete(deleteProvinceDto: DeleteProvinceDto): Promise<{}>;
}
