import { IRouteConfig, IRoutes } from '@rafterjs/api';

export default (): IRoutes =>
  new Set<IRouteConfig>([
    {
      endpoint: `/facilities`,
      controller: `covidTestingFacilitiesController`,
      action: `index`,
      method: `get`,
    },
  ]);
