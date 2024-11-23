// src/pages/_app.tsx
import '../app/styles/globals.css';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import Head from 'next/head';
import { AppProps } from 'next/app';  // Importing AppProps for proper typing

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

function MyApp({ Component, pageProps }: AppProps) {  // Use AppProps for typing
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
