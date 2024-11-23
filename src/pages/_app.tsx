// src/pages/_app.tsx
import '../app/styles/globals.css';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import Head from 'next/head';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

function MyApp({ Component, pageProps }: any) {
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
