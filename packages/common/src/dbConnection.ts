import * as mysql from 'mysql';
import * as util from 'util';
import { Connection } from 'mysql';
import { GlobalVar } from '.';
import { queryFn } from '@mapbul-pub/types';

class DbConnection {
  private connectionInt: Connection;
  private queryInt: queryFn;

  public setup() {
    this.connectionInt = mysql.createConnection(GlobalVar.env.dbConnection);
    this.queryInt = util.promisify(this.connectionInt.query).bind(this.connectionInt);
  }

  public get connection(): Connection {
    return this.connectionInt;
  }

  public get query(): queryFn {
    return this.queryInt;
  }

  public destroy() {
    if (this.connectionInt) {
      this.connectionInt.destroy();
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
export class DbConnectionSingleton {
  private static instance: DbConnection;

  constructor() {
    if (!DbConnectionSingleton.instance) {
      DbConnectionSingleton.instance = new DbConnection();
    }
  }

  public getInstance(): DbConnection {
    return DbConnectionSingleton.instance;
  }
}

export const dbConnectionSingleton = new DbConnectionSingleton();
