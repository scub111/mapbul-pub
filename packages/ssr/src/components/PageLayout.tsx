import * as React from 'react';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { theme } from 'themes';
import { AppBar, Footer } from '.';
import { useScrollPercentage } from 'hooks';
import { ScrollFab } from 'ui';
import { IPageBaseProps } from 'interfaces';

export const PageLayout: React.FC<IPageBaseProps> = ({
  children,
  title,
  description,
  imageUrl,
}) => {
  const [percent] = useScrollPercentage();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        {description && <meta property="og:description" content={description} />}
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>
      <header style={{ marginBottom: 110 }}>
        <AppBar />
      </header>
      <main>
        <div id="top" />
        {children && <Container maxWidth="lg">{children}</Container>}
      </main>
      <footer>
        <ScrollFab percent={percent} />
        <Footer style={{ padding: theme.spacing(6, 0) }} />
      </footer>
    </ThemeProvider>
  );
};
