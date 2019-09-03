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
    host: string;
    user: string;
    password: string;
    database: string;
  };
}

export let serverConfig: IServerConfig;
