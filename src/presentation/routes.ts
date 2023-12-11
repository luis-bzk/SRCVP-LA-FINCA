import { NextFunction, Request, Response, Router } from 'express';

import { CityRoutes } from './city/routes';
import { AuthRoutes } from './auth/routes';
import { RolesRoutes } from './role/routes';
import { UsersRoutes } from './user/routes';
import { CountryRoutes } from './country/routes';
import { CompanyRoutes } from './company/routes';
import { AddressRoutes } from './address/routes';
import { ProvincesRoutes } from './province/routes';
import { CategoryRoutes } from './category/routes';
import { PublicUserDataRoutes } from './public-user-data/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // global routes
    router.use('/api/auth', AuthRoutes.getRoutes);
    router.use('/api/users', UsersRoutes.getRoutes);
    router.use('/api/roles', RolesRoutes.getRoutes);
    router.use('/api/countries', CountryRoutes.getRoutes);
    router.use('/api/provinces', ProvincesRoutes.getRoutes);
    router.use('/api/cities', CityRoutes.getRoutes);
    router.use('/api/addresses', AddressRoutes.getRoutes);
    router.use('/api/public-user-data', PublicUserDataRoutes.getRoutes);
    router.use('/api/companies', CompanyRoutes.getRoutes);
    router.use('/api/categories', CategoryRoutes.getRoutes);

    router.use((_req: Request, res: Response, _next: NextFunction) => {
      res.status(404).json({ error: 'La ruta solicitada no existe' });
    });

    return router;
  }
}
