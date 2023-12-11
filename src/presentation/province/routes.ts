import { Router } from 'express';
import { ProvincesController } from './controller';
import { ProvincesDataSourceImpl } from '../../infrastructure/dataSources';
import { ProvincesRepositoryImpl } from '../../infrastructure/repositories';

export class ProvincesRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new ProvincesDataSourceImpl();
    const provinceRepository = new ProvincesRepositoryImpl(dataSource);
    const controller = new ProvincesController(provinceRepository);

    // routes
    router.post('/create', controller.createProvince);
    router.put('/update/:id', controller.updateProvince);
    router.get('/get/:id', controller.getProvince);
    router.get('/all', controller.getAllProvinces);
    router.delete('/delete/:id', controller.deleteProvince);

    return router;
  }
}
