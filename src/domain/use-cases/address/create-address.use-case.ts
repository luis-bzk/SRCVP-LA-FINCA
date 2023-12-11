import { Address } from '../../entities';
import { CreateAddressDto } from '../../dtos';
import { AddressRepository } from '../../repositories';

interface CreateAddressUseCase {
  execute(createAddressDto: CreateAddressDto): Promise<Address>;
}

export class CreateAddress implements CreateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(createAddressDto: CreateAddressDto): Promise<Address> {
    return await this.addressRepository.create(createAddressDto);
  }
}
