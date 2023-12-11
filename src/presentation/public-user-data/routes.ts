import { Router } from 'express';
import { PublicUserDataController } from './controller';
import { PublicUserDataDataSourceImpl } from '../../infrastructure/dataSources';
import { PublicUserDataRepositoryImpl } from '../../infrastructure/repositories';

export class PublicUserDataRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new PublicUserDataDataSourceImpl();
    const publicUserDataRepository = new PublicUserDataRepositoryImpl(dataSource);
    const controller = new PublicUserDataController(publicUserDataRepository);

    // routes
    router.post('/create', controller.createPublicUserData);
    router.put('/update/:id', controller.updatePublicUserData);
    router.get('/get/:id', controller.getPublicUserData);
    router.delete('/delete/:id', controller.deletePublicUserData);

    return router;
  }
}
