import { GetAddressDto } from '../../dtos';
import { Address } from '../../entities';
import { AddressRepository } from '../../repositories';

interface GetAddressUseCase {
  execute(getAddressDto: GetAddressDto): Promise<Address>;
}

export class GetAddress implements GetAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(getAddressDto: GetAddressDto): Promise<Address> {
    return this.addressRepository.get(getAddressDto);
  }
}
