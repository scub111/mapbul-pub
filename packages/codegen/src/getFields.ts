import { DbType, IField } from 'codegenSrc/IField';
import { IDbConnection } from '@mapbul-pub/types';
import { IMapConfig } from './generateController';

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

export const getFields = async (
  connection: IDbConnection,
  tableName: string,
  map: IMapConfig | undefined,
): Promise<Array<IField>> => {
  const result: any[] = await connection.query(`DESCRIBE ${tableName}`);
  // console.log(result);
  return result.map((row: IDescribeRowData, index: number) => {
    const fieldObject: IField = {
      fieldOrigin: row.Field,
      field: traslateField(row.Field),
      type: traslateType(row.Type),
      nullable: traslateNull(row.Null),
      separator: index !== result.length - 1 ? ',' : '',
    };

    let value = '';

    if (fieldObject.type === 'string') {
      //value = `'\${body.${field.field}}'`;
      value = fieldObject.nullable ? `\${body.${fieldObject.field} ? \`'\${body.${fieldObject.field}}'\` : 'NULL'}` : `'\${body.${fieldObject.field}}'`;
    } else if (fieldObject.type === 'Date') {
      //value = `'\${dateTimeFormat(body.${field.field})}'`;
      value = fieldObject.nullable ? `\${body.${fieldObject.field} ? \`'\${dateTimeFormat(body.${fieldObject.field})}'\` : 'NULL'}` : `'\${dateTimeFormat(body.${fieldObject.field})}'`;
    } else {
      //value = `\${body.${field.field}}`;
      value = fieldObject.nullable ? `\${body.${fieldObject.field} ? \`\${body.${fieldObject.field}}\` : 'NULL'}` : `\${body.${fieldObject.field}}`;
    }

    return {
      ...fieldObject,
      value,
      replaced: map && map.replaceValues?.some(item => item.field === fieldObject.field),
    };
  });
};
