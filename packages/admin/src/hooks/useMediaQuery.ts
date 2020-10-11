
import { useMediaQuery, useTheme } from '@material-ui/core';

export function useSmall() {
   const theme = useTheme();
   const isSmall = useMediaQuery(theme.breakpoints.down('xs'));

   return {
      isSmall
   };
}
