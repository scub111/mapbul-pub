import * as React from 'react';
import {
  Typography,
  Toolbar,
  AppBar as MuiAppBar,
  useTheme,
  useScrollTrigger,
  Container,
  Zoom,
  Fab,
  makeStyles,
  Theme,
  createStyles,
  // Slide,
} from '@material-ui/core';
import { useTranslation } from 'hooks';
import { IStyleProps } from 'interfaces';
import { LocaleSwitcher } from '.';
import { ActiveLink, IPageUrl } from './ActiveLink';
import { Routes } from '../constants';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

function ScrollTop(props: Props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#top');
    console.log(anchor);
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export const AppBar: React.FC<{ window?: () => Window } & IStyleProps> = props => {
  const { window } = props;
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
            <Typography variant="h5" color="inherit" align="center" noWrap style={{ flex: 1 }}>
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
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </MuiAppBar>
    // </Slide>
  );
};
