import * as React from 'react';
import { useScrollTrigger, Zoom, useTheme } from '@material-ui/core';
import { WindowProps } from 'interfaces';

export const ScrollTop: React.FC<WindowProps> = ({ children, window }) => {
  const theme = useTheme();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#top');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        style={{ position: 'fixed', bottom: theme.spacing(2), right: theme.spacing(2) }}
      >
        {children}
      </div>
    </Zoom>
  );
};
