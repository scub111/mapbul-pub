import { IField } from 'codegen/IField';
import { queryFn } from '@mapbul-pub/types';

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
  if (type.includes('varchar') || type.includes('text') || type.includes('char')) {
    return 'string';
  } else if (type.includes('int') || type.includes('float') || type.includes('double')) {
    return 'number';
  } else if (type.includes('bit')) {
    return 'boolean';
  } else if (type.includes('data') || type.includes('time')) {
    return 'Date';
  }
  return type;
};

export const getFields = async (query: queryFn, tableName: string) => {
  const result: any[] = await query(`DESCRIBE ${tableName}`);
  return result.map(
    (row: IDescribeRowData, index: number) =>
      ({
        fieldOrigin: row.Field,
        field: traslateField(row.Field),
        type: traslateType(row.Type),
        separator: index !== result.length - 1 ? ',' : '',
      } as IField),
  );
};
