import { Router } from 'express';
import { AddressController } from './controller';
import { AddressDataSourceImpl } from '../../infrastructure/dataSources';
import { AddressRepositoryImpl } from '../../infrastructure/repositories';

export class AddressRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new AddressDataSourceImpl();
    const addressRepository = new AddressRepositoryImpl(dataSource);
    const controller = new AddressController(addressRepository);

    // routes
    router.post('/create', controller.createAddress);
    router.put('/update/:id', controller.updateAddress);
    router.get('/get/:id', controller.getAddress);
    router.get('/get-all', controller.getAllAddresses);
    router.delete('/delete/:id', controller.deleteAddress);

    return router;
  }
}
