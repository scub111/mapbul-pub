import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Link as MuiLink, useTheme } from '@material-ui/core';
import { useTranslation } from 'hooks';
import { IPageUrl } from 'interfaces';
import { getActive } from 'utils';

export const ActiveLink: React.FC<IPageUrl> = ({ page, url }) => {
  const theme = useTheme();
  const router = useRouter();
  const { locale } = useTranslation();
  const href = `/${locale}${url}`;
  const isActive = getActive(`/[lang]${url}`, router.pathname);
  return (
    <Link key={page} href={`/[lang]${url}`} as={href}>
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
