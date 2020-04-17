import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Link as MuiLink, makeStyles } from '@material-ui/core';
import { useTranslation } from 'hooks';

export interface IPageUrl {
  page: string;
  url: string;
}

const useStyles = makeStyles(theme => ({
  root: (props: { isActive: boolean }) => ({
    padding: theme.spacing(1),
    flexShrink: 0,
    fontWeight: props.isActive ? 600 : 500,
  }),
}));

const getActive = (url: string, pathname: string): boolean => {
  if (url === '/[lang]') {
    return url === pathname;
  } else {
    return pathname.includes(url);
  }
};

export const ActiveLink: React.FC<IPageUrl> = ({ page, url }) => {
  const router = useRouter();
  const classes = useStyles({ isActive: getActive(`/[lang]${url}`, router.pathname) });
  const { locale } = useTranslation();
  const href = `/${locale}${url}`;
  return (
    <Link key={page} href={`/[lang]${url}`} as={href} scroll={false}>
      <MuiLink color="inherit" noWrap variant="h6" href={href} className={classes.root}>
        {page}
      </MuiLink>
    </Link>
  );
};
