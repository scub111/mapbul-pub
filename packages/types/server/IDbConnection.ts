export type queryFn = (expression: string) => Promise<any>;

export interface IDbConnection {
  connect(): void;
  query: queryFn;
  disconnect(): void;
}