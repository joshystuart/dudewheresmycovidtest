import { IPreStartHooks, IPreStartHookConfig } from 'rafter';

export default (): IPreStartHooks => new Set<IPreStartHookConfig>(['connectToDatabase']);
