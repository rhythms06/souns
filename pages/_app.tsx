import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/pages/components/layout";
import { AppContextProvider } from "@/contexts/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
