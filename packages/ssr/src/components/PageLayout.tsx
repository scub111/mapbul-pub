import * as React from 'react';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { theme } from 'themes';
import { AppBar, Footer } from '.';

export const PageLayout: React.FC<{ title?: string | null }> = ({ children, title = 'This is the default title' }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header style={{ marginBottom: 110 }}>
        <AppBar />
      </header>
      <main>
        <Container maxWidth="lg">{children}</Container>
      </main>
      <footer>
        <Footer style={{ padding: theme.spacing(6, 0) }} />
      </footer>
    </ThemeProvider>
  );
};
