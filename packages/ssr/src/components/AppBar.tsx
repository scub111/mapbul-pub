import * as React from 'react';
import styled from 'styled-components';
import {
  Typography,
  Toolbar,
  AppBar as MuiAppBar,
  useTheme,
  useScrollTrigger,
  Container,
  Button,
} from '@material-ui/core';
import { LocaleSwitcher, TabLinks } from '.';
import { Routes } from '@mapbul-pub/ui';
import { IPageUrl } from 'interfaces';
import { isClient } from 'utils';

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

export const AppBar = () => {
  const theme = useTheme();
  const notZeroTrigger = useScrollTrigger({
    target: isClient ? window : undefined,
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
            <Button
              variant="outlined"
              color="default"
              size="small"
              style={{
                marginRight: 10,
                color: 'white',
                borderColor: 'white',
              }}
              href={'http://admin.mapbul.scub111.com'}
            >
              Войти
            </Button>
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
