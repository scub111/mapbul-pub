import * as React from 'react';
import { useRouter } from 'next/dist/client/router';
import { locales } from 'translations/config';
import { LocaleContext } from 'context/LocaleContext';
import { RussiaIcon, EnglishIcon } from 'ui';
import { Locale } from '../translations/types';
import { useCallback } from 'react';

export const LocaleSwitcher: React.FC = () => {
  const router = useRouter();
  const { locale } = React.useContext(LocaleContext);
  const onClick = useCallback(() => {
    const value: Locale = locale === 'en' ? 'ru' : 'en';
    const regex = new RegExp(`^/(${locales.join('|')})`);
    router.push(router.pathname, router.asPath.replace(regex, `/${value}`));
  }, [locale]);

  return (
    <div onClick={onClick}>
      {locale === 'en' && <EnglishIcon style={{ width: 48, height: 25, border: '1px solid black' }} />}
      {locale === 'ru' && <RussiaIcon style={{ width: 48, height: 25, border: '1px solid black' }} />}
    </div>
  );
};
