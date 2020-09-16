import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from '../components/layout/Layout'
import theme from '../components/theme'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
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
      </Head>
      <StylesProvider injectFirst>
        <MaterialUIThemeProvider theme={theme}>
          <StyledComponentsThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StyledComponentsThemeProvider>
        </MaterialUIThemeProvider>
      </StylesProvider>
    </React.Fragment>
  )
}

export default MyApp
