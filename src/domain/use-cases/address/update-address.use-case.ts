import { Address } from '../../entities';
import { UpdateAddressDto } from '../../dtos';
import { AddressRepository } from '../../repositories';

interface UpdateAddressUseCase {
  execute(updateAddressDto: UpdateAddressDto): Promise<Address>;
}

export class UpdateAddress implements UpdateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(updateAddressDto: UpdateAddressDto): Promise<Address> {
    return await this.addressRepository.update(updateAddressDto);
  }
}
