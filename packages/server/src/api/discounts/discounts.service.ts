import * as mysql from 'mysql';
import * as util from 'util';
import { BaseService } from 'server/common/BaseService';
import { Connection } from 'mysql';
import { TID } from 'server/common/types';
import { GlobalVar } from '@mapbul-pub/common';
import { IDiscountDTO } from './discount.dto';

export class DiscountsService extends BaseService<IDiscountDTO> {
  constructor() {
    super();
    this.connection = mysql.createConnection(GlobalVar.env.dbConnection);
    this.query = util.promisify(this.connection.query).bind(this.connection);
  }

  connection: Connection;
  query: (expression: string) => Promise<any>;

  async getAll(): Promise<IDiscountDTO[]> {
    return await this.query(`
      SELECT
        \`id\`,
        \`value\`
      FROM discount`);
  }

  postItem(item: IDiscountDTO): IDiscountDTO {
    throw new Error('Method not implemented.');
  }
  putAll(item: IDiscountDTO): IDiscountDTO {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  async getItem(id: TID): Promise<IDiscountDTO> {
    return await this.query(`
      SELECT
        \`id\`,
        \`value\`
      FROM discount
      WHERE id = ${id}`);
  }
  putItem(id: TID): IDiscountDTO {
    throw new Error('Method not implemented.');
  }
  deleteItem(id: TID): IDiscountDTO {
    throw new Error('Method not implemented.');
  }
}
