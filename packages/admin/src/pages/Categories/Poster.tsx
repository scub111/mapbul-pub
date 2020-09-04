import * as React from 'react';
import { CSSProperties } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useImageInfo } from 'hooks';
import { Typography, Box } from '@material-ui/core';

export const Poster: React.FC<{ src: string; style?: CSSProperties }> = ({ src, style }) => {
   const [width, height] = useImageInfo(src);
   return (
      <Box>
         <Card style={{ display: 'inline-block', marginTop: '1em', zIndex: 2, ...style }}>
            <CardContent style={{ padding: 0 }}>
               <img
                  src={src}
                  alt=""
                  style={{
                     width: 'initial',
                     minWidth: 'initial',
                     maxWidth: '100%',
                     maxHeight: '30em'
                  }}
               />
            </CardContent>
         </Card>
         <Typography
            variant="subtitle1"
            paragraph
            component="h6"
            style={{ marginBottom: 0, fontSize: 12 }}
         >
            {`${width}x${height}`}
         </Typography>
      </Box>
   );
};
