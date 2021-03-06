import { React, useState } from "react";
import Head from "next/head";
import "../styles/globals.css";
import { AuthUserProvider } from "../context/AuthUserContext";
import Layout from "../components/Layout";
import theme from "../styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ConfirmationDialogProvider } from "../components/ConfirmationDialog";
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
          <title>PLUSLIST</title>
          <meta name="description" content="description" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <ConfirmationDialogProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ConfirmationDialogProvider>
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
