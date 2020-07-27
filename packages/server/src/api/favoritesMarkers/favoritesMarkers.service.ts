import { BaseService } from 'serverSrc/common/BaseService';
import { TID } from 'serverSrc/common/types';
import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, PageContent, IFavoritesMarkerDTO, IGetAllQuery } from '@mapbul-pub/types';

export class FavoritesMarkersService implements BaseService<IFavoritesMarkerDTO> {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async getAll(query: IGetAllQuery): Promise<PageContent<IFavoritesMarkerDTO>> {
    let filter = '';
    if (query.filter) {
      filter += `WHERE ${query.filter}`;
    }
    let sort = '';
    if (query.sort) {
      sort += `ORDER BY ${query.sort}`;
    }
    let additional = `${filter} ${sort}`;
    const isPagination = query.page && query.size;
    if (isPagination && query.page && query.size) {
      const offset = (query.page - 1) * query.size;
      additional += ` LIMIT ${offset},${query.size}; SELECT count(*) FROM favorites_marker ${filter}`;
    }
    const records = await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`markerId\`
      FROM favorites_marker ${additional}`);

    const totalElements = Number(records[1][0]['count(*)']);

    return {
      content: isPagination ? records[0] : records,
      totalElements,
      totalPages: isPagination ? Number(Math.ceil(totalElements / (query?.size || 1))) : 1,
    };
  }

  //postItem(item: IFavoritesMarkerDTO): Promise<IFavoritesMarkerDTO> {
  //  throw new Error('Method not implemented.');
  //}

  //putAll(item: IFavoritesMarkerDTO): IFavoritesMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteAll(): void {
  //  throw new Error('Method not implemented.');
  //}

  async getItem(id: TID): Promise<IFavoritesMarkerDTO> {
    return (
      await this.connection.query(`
      SELECT
        \`id\`,
        \`userId\`,
        \`markerId\`
      FROM favorites_marker
      WHERE id = ${id}`)
    )[0];
  }

  //putItem(id: TID): IFavoritesMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}

  //deleteItem(id: TID): IFavoritesMarkerDTO {
  //  throw new Error('Method not implemented.');
  //}
}
