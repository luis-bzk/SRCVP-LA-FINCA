import { Router } from 'express';
import { ProductDataSourceImpl } from '../../infrastructure/dataSources';
import { ProductRepositoryImpl } from '../../infrastructure/repositories';
import { ProductController } from './controller';

export class ProductRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new ProductDataSourceImpl();
    const repository = new ProductRepositoryImpl(dataSource);
    const controller = new ProductController(repository);

    // routes
    router.post('/create', controller.createProduct);

    return router;
  }
}
