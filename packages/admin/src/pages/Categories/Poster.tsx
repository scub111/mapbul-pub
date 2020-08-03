import * as React from 'react';
import { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FieldProps } from 'types';
import { ICategoryDTO } from '@mapbul-pub/types';

const Poster: FC<FieldProps<ICategoryDTO>> = ({ record }) => {
  console.log(222, record)

  if (!record) return null;

  return (
    <Card style={{ display: 'inline-block', marginTop: '1em', zIndex: 2 }}>
      <CardContent style={{ padding: 0 }}>
        <img src={`http://192.168.0.22:8081/${record.icon}`} alt=""
          style={{
            width: 'initial',
            minWidth: 'initial',
            maxWidth: '42em',
            maxHeight: '15em',
          }} />
      </CardContent>
    </Card>
  );
};

export default Poster;
