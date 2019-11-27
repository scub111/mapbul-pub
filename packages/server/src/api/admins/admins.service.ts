import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { PageContent, IAdminDTO } from '@mapbul-pub/types';
import { GetAllQueryDTO } from 'server/common/QueryDTO';

export class AdminsService extends BaseService<IAdminDTO> {
  constructor() {
    super();
    this.createConnection();
  }

  private connection: Connection;
  private nativeQuery: (expression: string) => Promise<any>;
  private isConnected: boolean;

  private createConnection(): void {
    this.connection = mysql.createConnection({ ...GlobalVar.env.dbConnection, multipleStatements: true });
    this.nativeQuery = util.promisify(this.connection.query).bind(this.connection);
    function handleDisconnect(cnx: Connection) {
      cnx.on('error', function (err: any) {
        this.isConnected = false;
      });
    };
    handleDisconnect(this.connection);
  }

  private async query(expression: string): Promise<any> {
    let records = [];
    try {
      if (!this.isConnected) {
        this.createConnection();
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

  async getAll(query: GetAllQueryDTO): Promise<PageContent<IAdminDTO>> {
    let additional = '';
    const isPagination = query.page && query.size;
    if (isPagination) {
      const offset = (query.page - 1) * query.size;
      additional = `limit ${offset},${query.size}; SELECT count(*) FROM admin`;
    }

    const records = await this.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`superuser\`
      FROM admin ${additional}`);

    if (this.isConnected)
      return {
        content: isPagination ? records[0] : records,
        totalPages: isPagination ? Number(Math.ceil(records[1][0]['count(*)'] / query.size)) : 1,
      };
    else
      return { content: {} as any, totalPages: 0 }
  }

  postItem(item: IAdminDTO): Promise<IAdminDTO> {
    throw new Error('Method not implemented.');
  }

  putAll(item: IAdminDTO): IAdminDTO {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  async getItem(id: TID): Promise<IAdminDTO> {
    return (await this.nativeQuery(`
      SELECT
        \`id\`,
        \`userId\`,
        \`superuser\`
      FROM admin
      WHERE id = ${id}`))[0];
  }

  putItem(id: TID): IAdminDTO {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: TID): IAdminDTO {
    throw new Error('Method not implemented.');
  }
}
