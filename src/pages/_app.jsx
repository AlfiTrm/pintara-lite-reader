import Layout from "@/components/Layout";
import "../styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope)
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
