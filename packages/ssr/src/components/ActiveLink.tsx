import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Link as MuiLink, useTheme } from '@material-ui/core';
import { useTranslation } from 'hooks';

export interface IPageUrl {
  page: string;
  url: string;
}

const getActive = (url: string, pathname: string): boolean => {
  if (url === '/[lang]') {
    return url === pathname;
  } else {
    return pathname.includes(url);
  }
};

export const ActiveLink: React.FC<IPageUrl> = ({ page, url }) => {
  const router = useRouter();
  const { locale } = useTranslation();
  const theme = useTheme();
  const href = `/${locale}${url}`;
  const isActive = getActive(`/[lang]${url}`, router.pathname);
  return (
    <Link key={page} href={`/[lang]${url}`} as={href} scroll={false}>
      <MuiLink
        color="inherit"
        noWrap
        variant="h6"
        href={href}
        style={{
          padding: theme.spacing(1),
          flexShrink: 0,
          // fontWeight: isActive ? 700 : 500,
          borderBottom: isActive ? '4px solid white' : '',
        }}
      >
        {page}
      </MuiLink>
    </Link>
  );
};
