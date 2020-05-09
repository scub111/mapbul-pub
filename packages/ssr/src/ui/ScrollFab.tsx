import * as React from 'react';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ScrollTop } from '.';
import { Fab } from '@material-ui/core';

export const ScrollFab: React.FC<{ percent: number }> = ({ percent }) => {
  const radius = 18;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percent / 100 * circumference;
  return (
    <ScrollTop>
      <Fab color="primary" size="small" aria-label="scroll back to top">
        {/* <KeyboardArrowUpIcon /> */}
        <svg width="40" height="40">
          <circle
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            stroke="red"
            strokeWidth="4"
            strokeDashoffset={offset.toString()}
            strokeDasharray={`${circumference}, ${circumference}`}
            fill="transparent"
            r={radius}
            cx="20"
            cy="20"
          />
          <g transform="translate(8, 7)">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="white"></path>
          </g>
        </svg>
      </Fab>
    </ScrollTop>
  );
};
