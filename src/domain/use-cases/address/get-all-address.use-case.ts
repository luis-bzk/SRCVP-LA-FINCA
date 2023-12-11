import { Address } from '../../entities';
import { AddressRepository } from '../../repositories';

interface GetAllAddressesUseCase {
  execute(): Promise<Address[]>;
}

export class GetAllAddresses implements GetAllAddressesUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(): Promise<Address[]> {
    return this.addressRepository.getAll();
  }
}
