import { Router } from 'express';

import { CategoryController } from './controller';
import { CategoryDataSourceImpl } from '../../infrastructure/dataSources';
import { CategoryRepositoryImpl } from '../../infrastructure/repositories';

export class CategoryRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new CategoryDataSourceImpl();
    const repository = new CategoryRepositoryImpl(dataSource);
    const controller = new CategoryController(repository);

    // routes
    router.post('/create', controller.createCategory);
    router.put('/update/:id', controller.updateCategory);
    router.get('/get/:id', controller.getCategory);
    router.get('/all', controller.getAllCategories);
    router.delete('/delete/:id', controller.deleteCategory);

    return router;
  }
}
