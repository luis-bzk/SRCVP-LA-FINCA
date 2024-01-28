import { Router } from 'express';
import { ProductController } from './controller';
import { ProductDataSourceImpl } from '../../infrastructure/dataSources';
import { ProductRepositoryImpl } from '../../infrastructure/repositories';

export class ProductRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new ProductDataSourceImpl();
    const repository = new ProductRepositoryImpl(dataSource);
    const controller = new ProductController(repository);

    // routes
    router.post('/create', controller.createProduct);
    router.put('/update/:id', controller.updateProduct);

    return router;
  }
}
