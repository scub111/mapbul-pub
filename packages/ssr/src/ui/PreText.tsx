import * as React from 'react';
import { Typography } from '@material-ui/core';

export const PreText: React.FC<{ text: string | null }> = ({ text }) => {
  return (
    <>
      {text &&
        text.split('\r\n').map((item, index) => (
          <Typography
            key={index}
            // variant={index === 0 ? 'h3' : 'subtitle1'}
            component={index === 0 ? 'h2' : item !== '' ? 'h3' : 'p'}
            dangerouslySetInnerHTML={{ __html: `${item} <br />` }}
          />
        ))}
    </>
  );
};