import Head from "next/head";
import "../styles/globals.css";
import { AuthUserProvider } from "../context/AuthUserContext";
import Layout from "../components/Layout";
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";
import "../theme/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthUserProvider>
        <Head>
          <title>DO_TODO</title>
          <meta name="description" content="description" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
