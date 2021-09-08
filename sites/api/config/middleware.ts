import { IMiddlewareConfig, IMiddlewares } from '@rafterjs/api';

export default (): IMiddlewares => new Set<IMiddlewareConfig>(['cors']);
