import * as mysql from 'mysql';
import * as util from 'util';
import { Connection } from 'mysql';
import { IDbConnection, queryFn } from '@mapbul-pub/types';
import { GlobalVar } from '.';

class DbConnection implements IDbConnection {
  private nativeConnection: Connection;
  private nativeQuery: queryFn;
  private isConnected: boolean;

  connect() {
    this.nativeConnection = mysql.createConnection({
      ...GlobalVar.env.dbConnection,
      multipleStatements: true,
    });
    this.nativeQuery = util.promisify(this.nativeConnection.query).bind(this.nativeConnection);
    function handleDisconnect(cnx: Connection) {
      cnx.on('error', function() {
        this.isConnected = false;
      });
    }
    handleDisconnect(this.nativeConnection);
  }

  async query(expression: string): Promise<any> {
    let records;
    try {
      if (!this.isConnected) {
        this.connect();
      }

      records = await this.nativeQuery(expression);

      this.isConnected = true;
    } catch (e) {
      this.isConnected = false;
      throw e;
    }

    return records;
  }

  disconnect() {
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

  public getInstance(): IDbConnection {
    return DbConnectionSingleton.instance;
  }
}

export const dbConnectionSingleton = new DbConnectionSingleton();
