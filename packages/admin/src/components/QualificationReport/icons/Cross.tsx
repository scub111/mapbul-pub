import * as React from 'react';

export const Cross = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="32" height="33" viewBox="0 0 32 33" {...props}>
    <circle cx="16" cy="16.4502" r="16" fill={props.color} />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.0515 8.35199L15.999 14.2997L21.9485 8.35199C22.4178 7.88267 23.1787 7.88267 23.648 8.35199C24.1173 8.82131 24.1173 9.58223 23.648 10.0515L17.6995 15.999L23.648 21.9485C24.1173 22.4178 24.1173 23.1787 23.648 23.648C23.1787 24.1173 22.4178 24.1173 21.9485 23.648L15.999 17.6995L10.0515 23.648C9.58223 24.1173 8.82131 24.1173 8.35199 23.648C7.88267 23.1787 7.88267 22.4178 8.35199 21.9485L14.2997 15.999L8.35199 10.0515C7.88267 9.58223 7.88267 8.82131 8.35199 8.35199C8.82131 7.88267 9.58223 7.88267 10.0515 8.35199Z"
      fill="white"
    />
  </svg>
);