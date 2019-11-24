import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';

const trasformParam = (param: string, defaultValue: number = 1) => {
  const paramInt = Number(param);
  if (isNaN(paramInt)) {
    return defaultValue;
  }
  return paramInt;
};

export class GetAllQueryDTO {
  @Optional()
  @Transform(value => trasformParam(value))
  page: number;

  @Optional()
  @Transform(value => trasformParam(value, 10))
  size: number;
}
