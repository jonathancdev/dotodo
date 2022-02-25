import Head from "next/head";
import "../styles/globals.css";
import { AuthUserProvider } from "../context/AuthUserContext";
import Layout from "../components/Layout";
import theme from "../styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import "@fontsource/work-sans/100.css";
import "@fontsource/work-sans/200.css";
import "@fontsource/work-sans/300.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "@fontsource/work-sans/800.css";

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
