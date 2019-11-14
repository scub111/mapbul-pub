import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';

export class QueryDTO {
    @Optional()
    @Transform(limit => {
      limit = Number(limit);
      if (isNaN(limit)) { return limit = 0; }
      return limit;
    })
    limit: number = 0;
}