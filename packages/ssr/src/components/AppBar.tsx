import * as React from 'react';
import styled from 'styled-components';
import { Typography, Toolbar, AppBar as MuiAppBar, useTheme, useScrollTrigger, Container } from '@material-ui/core';
import { LocaleSwitcher, TabLinks } from '.';
import { Routes } from '../constants';
import { IPageUrl } from 'interfaces';
import { isClientEnviroment } from 'utils';

const sections: Array<IPageUrl> = [
  {
    page: 'main',
    url: '',
  },
  {
    page: 'articles',
    url: `/${Routes.articles}`,
  },
  {
    page: 'events',
    url: `/${Routes.events}`,
  },
  {
    page: 'places',
    url: `/${Routes.places}`,
  },
];

const StyledContainer = styled(Container)`
  @media (max-width: 400px) {
    padding: 0 5px;
  }
`;

export const AppBar: React.FC = () => {
  const theme = useTheme();
  const notZeroTrigger = useScrollTrigger({
    target: isClientEnviroment ? window : undefined,
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <MuiAppBar component="nav" elevation={notZeroTrigger ? 10 : 0} style={{ padding: 0 }}>
      <StyledContainer maxWidth="lg">
        {!notZeroTrigger && (
          <Toolbar variant="dense" style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h5" color="inherit" align="center" noWrap style={{ flex: 1 }}>
              X-island
            </Typography>
            <LocaleSwitcher />
          </Toolbar>
        )}
        <Toolbar variant="dense" style={{ padding: 0 }}>
          <TabLinks sections={sections} />
          {notZeroTrigger && <LocaleSwitcher />}
        </Toolbar>
      </StyledContainer>
    </MuiAppBar>
  );
};
