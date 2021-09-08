import { IServerConfig } from 'rafter';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ICovidAppConfig = IServerConfig & {};

export const config = async (): Promise<ICovidAppConfig> => {
  return {
    server: {
      port: process.env.DWMC_API_PORT ? parseInt(process.env.DWMC_API_PORT, 10) : 5001,
    },
  };
};

export default config;
