import * as React from 'react';
import './App.styl';
import { Grommet } from 'grommet';
import { Theme, rusalTheme } from 'themes';

export const App: React.FC = () => {
  return (
    <Grommet
      theme={{ ...Theme, ...rusalTheme }}
      plain={true}
      full={true}
      id="grommetRoot"
    >
    </Grommet>
  );
};
