import Layout from "@/components/Layout";
import { FavouritesProvider } from "@/context/FavouritesContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <FavouritesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FavouritesProvider>
  );
}
