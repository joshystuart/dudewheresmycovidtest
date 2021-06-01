import { IPlugin, IPlugins } from '@rafterjs/lambda';

export default (): IPlugins => new Set<IPlugin>(['@rafterjs/logger-plugin', '@rafterjs/utils']);
