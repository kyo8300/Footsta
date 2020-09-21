import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from '../components/layout/Layout'
import theme from '../components/theme'

import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client'
import withApollo from '../utils/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'

interface Props {
  pageProps: AppProps
  Component: React.ElementType
  apollo: ApolloClient<NormalizedCacheObject>
}

function MyApp({ pageProps, Component, apollo }: Props): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <meta property="og:url" content="ページのURL" /> */}
        {/* <meta property="og:image" content="画像のURL" /> */}
        <meta property="og:title" content="Football Discussion Forum" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Football discussion forum website. Transfer news, Premier Leage, Primera Division, Serie A, Bundesliga, Ligue 1, UEFA Champions League and more."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@CristianoRocky" />

        <meta property="og:site_name" content="Footsta" />
        <title>Footsta</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="android-touch-icon.png" />
        <link
          rel="icon"
          href="images/png"
          color="/images/android-chrome-192x192.png"
        />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#53d9ec"
        />
        <meta name="apple-mobile-web-app-title" content="Footsta" />
        <meta name="application-name" content="Footsta" />
        <meta name="msapplication-TileColor" content="#53d9ec" />
        <meta name="theme-color" content="#53d9ec" />
      </Head>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <ApolloProvider client={apollo}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ApolloProvider>
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </React.Fragment>
  )
}

export default withApollo(MyApp, { getDataFromTree })
