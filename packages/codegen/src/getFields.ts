import { DbType, IField } from 'codegenSrc/IField';
import { IDbConnection } from '@mapbul-pub/types';

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

const traslateNull = (nullable: string) => {
  return nullable === 'YES';
};

const traslateType = (type: string): DbType => {
  if (type.includes('varchar') || type.includes('text') || type.includes('char')) {
    return 'string';
  } else if (type.includes('int') || type.includes('float') || type.includes('double')) {
    return 'number';
  } else if (type.includes('bit')) {
    return 'boolean';
  } else if (type.includes('data') || type.includes('time')) {
    return 'Date';
  }
  return 'unknown';
};

export const getFields = async (connection: IDbConnection, tableName: string): Promise<Array<IField>> => {
  const result: any[] = await connection.query(`DESCRIBE ${tableName}`);
  // console.log(result);
  return result.map((row: IDescribeRowData, index: number) => {
    const field = {
      fieldOrigin: row.Field,
      field: traslateField(row.Field),
      type: traslateType(row.Type),
      nullable: traslateNull(row.Null),
      separator: index !== result.length - 1 ? ',' : '',
    };

    let value = '';

    if (field.type === 'string') {
      value = `'\${body.${field.field}}'`
    } else if (field.type === 'Date') {
      value = `'\${dateTimeFormat(body.${field.field})}'`
    } else {
      value = `\${body.${field.field}}`
    }

    return {
      ...field,
      value
    };
  });
};
