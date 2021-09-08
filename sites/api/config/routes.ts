import { IRouteConfig, IRoutes } from '@rafterjs/api';

export default (): IRoutes =>
  new Set<IRouteConfig>([
    {
      endpoint: `/health`,
      controller: `healthController`,
      action: `index`,
      method: `get`,
    },
    {
      endpoint: `/facilities`,
      controller: `covidTestingFacilitiesController`,
      action: `index`,
      method: `get`,
    },
  ]);
