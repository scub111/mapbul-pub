import * as mysql from 'mysql';
import * as util from 'util';
import { Connection, GeometryType } from 'mysql';
import { IDbConnection, queryFn } from '@mapbul-pub/types';
import { GlobalVar } from '.';

type FieldInfoEx = { type: string, length: number, string(): string, buffer(): Buffer, geometry(): null | GeometryType };

class DbConnection implements IDbConnection {
  private nativeConnection: Connection;
  private nativeQuery: queryFn;
  private isConnected: boolean;

  connect() {
    this.nativeConnection = mysql.createConnection({
      ...GlobalVar.env.dbConnection,
      multipleStatements: true,
      typeCast: function castField(field: FieldInfoEx, useDefaultTypeCasting) {
        if ((field.type === "BIT") && (field.length === 1)) {

          var bytes = field.buffer();
          return (bytes[0] === 1);
        }

        return (useDefaultTypeCasting());
      }
    });
    this.nativeQuery = util.promisify(this.nativeConnection.query).bind(this.nativeConnection);
    function handleDisconnect(cnx: Connection) {
      cnx.on('error', function () {
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
