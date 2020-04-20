import * as React from 'react';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { theme } from 'themes';
import { AppBar, Footer } from '.';

type TNullString = string | undefined;

export const PageLayout: React.FC<{ title?: TNullString, description?: TNullString, imageUrl?: TNullString }> = ({ children, title = 'This is the default title', description, imageUrl }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl}/>
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
