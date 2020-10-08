export type DbType = 'string' | 'number' | 'boolean' | 'Date' | 'unknown';

export interface IField {
  fieldOrigin: string;
  field: string;
  type: DbType;
  nullable: boolean;
  separator: string;
  value?: string;
  defined?: boolean;
}
