import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import store from '../store'
import getEnv from '../environments'

import '../styles/fontawesome'
import '../styles/global.scss'

const env = getEnv()

export default withRedux(store, { debug: !env.production })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      }
    }

    render() {
      const { Component, pageProps, store } = this.props
      return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      )
    }
  }
)
