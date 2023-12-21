import { PublicUserData } from '../entities';
import {
  CreatePublicUserDataDto,
  DeletePublicUserDataDto,
  GetPublicUserDataDto,
  UpdatePublicUserDataDto,
} from '../dtos/publicUserData';

export abstract class PublicUserDataDataSource {
  abstract create(createPublicUserDataDto: CreatePublicUserDataDto): Promise<PublicUserData>;
  abstract update(updatePublicUserDataDto: UpdatePublicUserDataDto): Promise<PublicUserData>;
  abstract get(getPublicUserDataDto: GetPublicUserDataDto): Promise<PublicUserData>;
  abstract delete(deletePublicUserDataDto: DeletePublicUserDataDto): Promise<{}>;
}
