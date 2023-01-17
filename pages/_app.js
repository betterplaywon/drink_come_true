import '../styles/globals.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';
import { SessionProvider } from 'next-auth/react';

function DrinkComeTrue({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>DrinkComeTrue</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

DrinkComeTrue.prototypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(DrinkComeTrue);
