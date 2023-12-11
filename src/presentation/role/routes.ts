import { Router } from 'express';
import { RoleController } from './controller';
import { RolesDataSourceImpl } from '../../infrastructure/dataSources';
import { RoleRepositoryImpl } from '../../infrastructure/repositories';

export class RolesRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new RolesDataSourceImpl();
    const roleRepository = new RoleRepositoryImpl(dataSource);
    const controller = new RoleController(roleRepository);

    // routes
    router.post('/create', controller.createRole);
    router.put('/update/:id', controller.updateRole);
    router.delete('/delete/:id', controller.deleteRole);
    router.get('/get/:id', controller.getRole);
    router.get('/get-all', controller.getAllRoles);

    return router;
  }
}
