import * as React from 'react';
import Head from 'next/head';
// import SearchIcon from '@material-ui/icons/Search';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
// import { Container, Toolbar, Button, Typography, IconButton, makeStyles } from '@material-ui/core';
import { Container, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { theme } from 'themes';
import { Routes } from '../constants';
import { IPageUrl, ActiveLink } from './ActiveLink';
import { useTranslation } from 'hooks';
import { LocaleSwitcher } from '.';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
  },
}));

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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {/* <Link href="http://scub111.com:9090/">
        Mapbul Website
      </Link>{' '} */}
      {new Date().getFullYear()}
    </Typography>
  );
}

export const PageLayout: React.FC<{ title?: string }> = ({ children, title = 'This is the default title' }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxWidth="lg">
        <header>
          <Toolbar className={classes.toolbar}>
            {/* <Button size="small">Подписаться</Button> */}
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              X-island
            </Typography>
            <LocaleSwitcher />
            {/* <IconButton>
              <SearchIcon />
            </IconButton>
            <Button variant="outlined" size="small">
              Войти
            </Button> */}
          </Toolbar>
          <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
            {sections.map(section => (
              <ActiveLink key={section.page} page={t(section.page)} url={section.url} />
            ))}
          </Toolbar>
        </header>
        <main>{children}</main>
        <footer className={classes.footer}>
          <Container maxWidth="lg">
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Все права защищены
            </Typography>
            <Copyright />
          </Container>
        </footer>
      </Container>
    </ThemeProvider>
  );
};
