import { IPlugin, IPlugins } from '@rafterjs/lambda';

export default (): IPlugins =>
  new Set<IPlugin>([
    '@rafterjs/logger-plugin',
    '@rafterjs/utils',
    '@dwmc-common/database',
    '@dwmc-common/dhhs-victoria-website-data',
    '@dwmc-common/health-direct-data',
  ]);
