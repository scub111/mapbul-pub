export interface IGetAllQuery {
  page?: number;
  size?: number;
  filter?: string;
  sort?: string;
  id?: string | Array<string>;
}
