import * as React from 'react';
import Head from 'next/head';
import Link from '../Link';
import SearchIcon from '@material-ui/icons/Search';
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
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
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
    url: "/" 
  }, 
  { 
    page: 'Статьи', 
    url: "/articles" 
  }, 
  { 
    page: 'О компании', 
    url: "/about" 
  },
  { 
    page: 'Блог', 
    url: "/blog" 
  }
];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Mapbool Website
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

interface Props {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Button size="small">Подписаться</Button>
            <Typography component="h2" variant="h5" color="inherit" align="center" noWrap className={classes.toolbarTitle}>
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
              <Link color="inherit" noWrap key={section.page} variant="body2" href={section.url} className={classes.toolbarLink}>
                {section.page}
              </Link>
            ))}
          </Toolbar>
        </Container>
      </header>
      {children}
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Все права защищены
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
};

export default Layout;
