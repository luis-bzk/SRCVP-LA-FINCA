import { DeleteAddressDto } from '../../dtos';
import { AddressRepository } from '../../repositories';

interface DeleteAddressUseCase {
  execute(deleteAddressDto: DeleteAddressDto): Promise<{}>;
}

export class DeleteAddress implements DeleteAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  execute(deleteAddressDto: DeleteAddressDto): Promise<{}> {
    return this.addressRepository.delete(deleteAddressDto);
  }
}
