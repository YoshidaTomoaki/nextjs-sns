// next.js v9 https://nextjs.org/docs/advanced-features/custom-app
// using typescript https://nextjs.org/docs/basic-features/typescript#custom-app
// using material-ui https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
// import App from 'next/app'

import React from "react"
import { AppProps } from "next/app"
import CssBaseline from "@material-ui/core/CssBaseline"
import PropTypes from "prop-types"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "components/theme"

import "isomorphic-unfetch"

import { useRouter } from "next/router"
import { UserProvider } from "utill/UserContext"
import { UserProviderModify } from "utill/UserContextMod"

import { checkLogin } from "models/Auth"

export async function getServerSideProps({ req, query }) {
  const user = req && req.session ? req.session.decodedToken : null
  // don't fetch anything from firebase if the user is not found
  // const snap = user && await req.firebaseServer.database().ref('messages').once('value')
  // const messages = snap && snap.val()
  const messages = null
  return {
    props: {
      user,
      messages,
    },
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState(null)
  const router = useRouter()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    // 現在ログイン中のユーザー取得
    // [todo]UserProviderをreducer化
    const checkedUser = checkLogin(setUser, router)
    console.log('checkedUser',checkedUser)
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserProviderModify>
          <UserProvider value={user}>
            <Component {...pageProps} />
          </UserProvider>
        </UserProviderModify>
      </ThemeProvider>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
