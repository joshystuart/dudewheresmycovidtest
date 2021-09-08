export type IDatabaseConfig = {
  database: {
    username: string;
    password: string;
    host: string;
    port: number;
    database: string;
  };
};

export const config = async (): Promise<IDatabaseConfig> => {
  return {
    database: {
      username: process.env.DWMC_DATABASE_USERNAME || 'dwmc',
      password: process.env.DWMC_DATABASE_PASSWORD || 'password',
      host: process.env.DWMC_DATABASE_HOST || 'localhost',
      port: process.env.DWMC_DATABASE_PORT ? Number(process.env.DWMC_DATABASE_PORT) : 15432,
      database: process.env.DWMC_DATABASE || 'dwmc',
    },
  };
};

export default config;
