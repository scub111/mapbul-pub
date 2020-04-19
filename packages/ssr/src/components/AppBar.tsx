import * as React from 'react';
import {
  Typography,
  Toolbar,
  AppBar as MuiAppBar,
  useTheme,
  useScrollTrigger,
  Container,
  // Slide,
} from '@material-ui/core';
import { useTranslation } from 'hooks';
import { IStyleProps } from 'interfaces';
import { LocaleSwitcher } from '.';
import { ActiveLink, IPageUrl } from './ActiveLink';
import { Routes } from '../constants';

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
];

export const AppBar: React.FC<{ window?: any } & IStyleProps> = ({ window }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const notZeroTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  // const sliceTrigger = useScrollTrigger({
  //   target: window ? window() : undefined,
  // });

  // console.log(111, sliceTrigger);

  return (
    // <Slide direction="down" in={true} mountOnEnter={false}>
      <MuiAppBar component="nav" elevation={notZeroTrigger ? 10 : 0}>
        <Container maxWidth="lg">
          {!notZeroTrigger && (
            <Toolbar variant="dense" style={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography component="h2" variant="h5" color="inherit" align="center" noWrap style={{ flex: 1 }}>
                X-island
              </Typography>
              <LocaleSwitcher />
            </Toolbar>
          )}
          <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
            {sections.map(section => (
              <ActiveLink key={section.page} page={t(section.page)} url={section.url} />
            ))}
            {notZeroTrigger && <LocaleSwitcher />}
          </Toolbar>
        </Container>
      </MuiAppBar>
    // </Slide>
  );
};
