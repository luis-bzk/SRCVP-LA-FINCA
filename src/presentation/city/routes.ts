import { Router } from 'express';
import { CityController } from './controller';
import { CityDataSourceImpl } from '../../infrastructure/dataSources';
import { CityRepositoryImpl } from '../../infrastructure/repositories';

export class CityRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new CityDataSourceImpl();
    const cityRepository = new CityRepositoryImpl(dataSource);
    const controller = new CityController(cityRepository);

    // routes
    router.post('/create', controller.createCity);
    router.put('/update/:id', controller.updateCity);
    router.get('/get/:id', controller.getCity);
    router.get('/get-all', controller.getAllCities);
    router.delete('/delete/:id', controller.deleteCity);

    return router;
  }
}
