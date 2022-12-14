import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Top Courses - топ курсов</title>
        <meta
          property='og:url'
          content={`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`}
        />
        <meta property='og:locale' content='ru_RU' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
