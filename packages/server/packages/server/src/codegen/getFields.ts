import * as mysql from 'mysql';
import * as util from 'util';
import { Connection } from 'mysql';
import { serverConfig } from 'common/serverConfig';
import { IField } from './IField';
const connection: Connection = mysql.createConnection(serverConfig.dbConnection);
const query: (expression: string) => Promise<any> = util.promisify(connection.query).bind(connection);

interface IDescribeRowData {
  Default: any;
  Field: string;
  Key: string;
  Null: string;
  Type: string;
}

const traslateField = (field: string) => {
  return field[0].toLowerCase() + field.slice(1);
};

const traslateType = (type: string) => {
  if (type.includes('varchar') || type.includes('text')) {
    return 'string';
  } else if (type.includes('int')) {
    return 'number';
  } else if (type.includes('data') || type.includes('time')) {
    return 'Date';
  }
  return type;
};

export const getFields = async (tableName: string) => {
  const result = await query(`DESCRIBE ${tableName}`);
  return result.map((row: IDescribeRowData) => ({
    fieldOrigin: row.Field,
    field: traslateField(row.Field),
    type: traslateType(row.Type)} as IField));
};
