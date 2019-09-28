export const setEnvVariables = (path: string) => {
  require('dotenv').config({ path });
  serverConfig = {
    isProduction: process.env.NODE_ENV !== 'development',
    dbConnection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  };
};

export interface IServerConfig {
  isProduction: boolean;
  dbConnection: {
    host: string | undefined;
    user: string | undefined;
    password: string | undefined;
    database: string | undefined;
  };
}

export let serverConfig: IServerConfig;
