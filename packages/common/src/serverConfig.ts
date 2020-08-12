export interface IServerConfig {
  isProduction: boolean;
  dbConnection: {
    host: string;
    user: string;
    password: string;
    database: string;
  };
  fileStorage: string;
}

class GlobalVarClass {
  public env: IServerConfig;

  public setup = (path: string): IServerConfig => {
    require('dotenv').config({ path });
    // const result = require('dotenv').config({ path });
    // console.log(result);
    const { NODE_ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, FILE_STORAGE } = process.env;
    this.env = {
      isProduction: NODE_ENV !== 'development',
      dbConnection: {
        host: DB_HOST || '',
        user: DB_USER || '',
        password: DB_PASSWORD || '',
        database: DB_DATABASE || '',
      },
      fileStorage: FILE_STORAGE || '',
    };
    return this.env;
  };
}

export const GlobalVar = new GlobalVarClass();
