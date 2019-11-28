import * as mysql from 'mysql';
import * as util from 'util';
import { Connection } from 'mysql';
import { queryFn } from '@mapbul-pub/types';
import { GlobalVar } from '.';

export class DbConnection {
  private nativeConnection: Connection;
  private nativeQuery: queryFn;
  private isConnected: boolean;

  setup() {
    this.nativeConnection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.nativeQuery = util.promisify(this.nativeConnection.query).bind(this.nativeConnection);
    function handleDisconnect(cnx: Connection) {
      cnx.on('error', function (err: any) {
        this.isConnected = false;
      });
    };
    handleDisconnect(this.nativeConnection);
  }

  async query(expression: string): Promise<any> {
    let records;
    try {
      if (!this.isConnected) {
        this.setup();
      }

      records = await this.nativeQuery(expression);

      this.isConnected = true;
    }
    catch (e) {
      this.isConnected = false;
      throw e;
    }

    return records;
  }

  destroy() {
    if (this.nativeConnection) {
      this.nativeConnection.destroy();
    }
  }
}

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
