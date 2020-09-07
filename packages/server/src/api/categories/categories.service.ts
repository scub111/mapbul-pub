import { IBaseService, TID, IOkPacket } from 'interfaces';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { dateTimeFormat } from '@mapbul-pub/utils';
import { IDbConnection, PageContent, ICategoryDTO, IGetAllQuery } from '@mapbul-pub/types';

export class CategoriesService implements IBaseService<ICategoryDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<ICategoryDTO>> {
    let filter = '';
    if (query.filter) {
      filter += `WHERE ${query.filter}`;
    }
    if (query.id) {
      if (!Array.isArray(query.id)) filter += `WHERE id in (${query.id})`;
      else filter += `WHERE id in (${query.id.join(',')})`;
    }
    let sort = '';
    if (query.sort) {
      sort += `ORDER BY ${query.sort}`;
    }
    let additional = `${filter} ${sort}`;
    const isPagination = query.page && query.size;
    if (isPagination && query.page && query.size) {
      const offset = (query.page - 1) * query.size;
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM category ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`parentId\`,
        \`addedDate\`,
        \`icon\`,
        \`color\`,
        \`pin\`,
        \`forArticle\`
      FROM category ${additional}`);

    const totalElements = isPagination ? Number(records[1][0]['count(*)']) : records.length;

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  async postItem(body: ICategoryDTO): Promise<ICategoryDTO> {
    const response: IOkPacket = await this.connection.query(
      `
      INSERT INTO category
      (
        \`name\`,
        \`enName\`,
        \`parentId\`,
        \`addedDate\`,
        \`icon\`,
        \`color\`,
        \`pin\`,
        \`forArticle\`
      ) 
      Values 
      (
        '${body.name}',
        '${body.enName}',
        ${body.parentId},
        '${dateTimeFormat(body.addedDate)}',
        '${body.icon}',
        '${body.color}',
        '${body.pin}',
        ${body.forArticle}
      )`.replace(/\\/g, '\\\\'),
    );
    return {
      id: response.insertId,
      ...body,
    };
  }

  //putAll(item: ICategoryDTO): ICategoryDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<ICategoryDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`name\`,
        \`enName\`,
        \`parentId\`,
        \`addedDate\`,
        \`icon\`,
        \`color\`,
        \`pin\`,
        \`forArticle\`
      FROM category
      WHERE id = ${id}`)
    )[0];
  }

  async putItem(id: TID, body: ICategoryDTO): Promise<ICategoryDTO> {
    await this.connection.query(
      `
      UPDATE category
      SET
        \`name\`='${body.name}',
        \`enName\`='${body.enName}',
        \`parentId\`=${body.parentId},
        \`addedDate\`='${dateTimeFormat(body.addedDate)}',
        \`icon\`='${body.icon}',
        \`color\`='${body.color}',
        \`pin\`='${body.pin}',
        \`forArticle\`=${body.forArticle}
      WHERE id = ${id}`.replace(/\\/g, '\\\\'),
    );
    return body;
  }

  async deleteItem(id: TID): Promise<ICategoryDTO> {
    const record = await this.getItem(id);
    await this.connection.query(`
      DELETE FROM category
      WHERE id = ${id}`);
    return record;
  }
}
