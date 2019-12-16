import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SearchIcon from '@material-ui/icons/Search';
import { Link as MuiLink, CssBaseline } from '@material-ui/core';
import { Container, Toolbar, Button, Typography, IconButton, makeStyles } from '@material-ui/core';

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
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));

interface IPageUrl {
  page: string;
  url: string;
}

const sections: Array<IPageUrl> = [
  {
    page: 'Главная',
    url: '/',
  },
  {
    page: 'Статьи',
    url: '/articles',
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

interface Props {
  title?: string;
}

const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxWidth="lg">
        <header>
          <Toolbar className={classes.toolbar}>
            <Button size="small">Подписаться</Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              MapBul
            </Typography>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <Button variant="outlined" size="small">
              Войти
            </Button>
          </Toolbar>
          <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
            {sections.map(section => (
              <Link key={section.page} href={section.url} scroll={false}>
                <MuiLink
                  color="inherit"
                  noWrap
                  key={section.page}
                  variant="body2"
                  href={section.url}
                  className={classes.toolbarLink}
                >
                  {section.page}
                </MuiLink>
              </Link>
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
    </div>
  );
};

export default Layout;
