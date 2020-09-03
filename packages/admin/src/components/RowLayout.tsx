import * as React from 'react';
import { Box } from '@material-ui/core';
import { CSSProperties } from 'react';

export const RowLayout: React.FC<{ style?: CSSProperties }> = ({ children, style }) => (
   <Box display={{ xs: 'block', sm: 'flex' }} style={{ width: '100%' }}>
      {React.Children.toArray(children).map((child, i, array) => {
         return (
            <Box
               key={i}
               flex={1}
               mr={{ xs: 0, sm: i !== array.length - 1 ? '1em' : 0 }}
               style={style}
            >
               {child}
            </Box>
         );
      })}
   </Box>
);
