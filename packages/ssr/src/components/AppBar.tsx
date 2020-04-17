import * as React from 'react';
import { Typography, Toolbar, makeStyles } from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: 'black',
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    zIndex: 1,
    color: 'black',
  },
}));

export const AppBar: React.FC<IStyleProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <AppBar style={{ background: 'white' }}>
      <Toolbar >
        <Typography component="h2" variant="h5" color="inherit" align="center" noWrap className={classes.toolbarTitle}>
          X-island
        </Typography>
        <LocaleSwitcher />
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map(section => (
          <ActiveLink key={section.page} page={t(section.page)} url={section.url} />
        ))}
      </Toolbar>
    </AppBar>
  );
};
