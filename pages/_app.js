import '../styles/globals.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';

function DrinkComeTrue({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>DrinkComeTrue</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

DrinkComeTrue.prototypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(DrinkComeTrue);
