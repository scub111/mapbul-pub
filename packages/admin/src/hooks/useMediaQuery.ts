import * as React from 'react';
import { useMediaQuery, Theme } from '@material-ui/core';

export function useSmall() {
   const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

   return {
      isSmall
   };
}
