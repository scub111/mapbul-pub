import * as React from 'react';
import { customizeHOC } from './CustomizedIcons';

const Icon = (props: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 6" width="1200" height="600" {...props}>
      <rect fill="#fff" width="12" height="3" />
      <rect fill="#d52b1e" y="3" width="12" height="3" />
      <rect fill="#0039a6" y="2" width="12" height="2" />
    </svg>
  );
};

export const RussiaIcon = customizeHOC(Icon);
