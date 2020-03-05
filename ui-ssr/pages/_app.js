import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import store from '../store';

import '../styles/global.scss'

export default withRedux(store, { debug: true })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      );
    }
  }
);
