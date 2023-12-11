import { Address } from '../entities';
import { CreateAddressDto, DeleteAddressDto, GetAddressDto, UpdateAddressDto } from '../dtos';

export abstract class AddressDataSource {
  abstract create(createAddressDto: CreateAddressDto): Promise<Address>;
  abstract update(updateAddressDto: UpdateAddressDto): Promise<Address>;
  abstract get(getAddressDto: GetAddressDto): Promise<Address>;
  abstract getAll(): Promise<Address[]>;
  abstract delete(deleteAddressDto: DeleteAddressDto): Promise<{}>;
}
