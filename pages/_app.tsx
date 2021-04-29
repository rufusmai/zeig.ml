import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Head>
        <title>zeig.ml | URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

        <script async defer src="https://datenkrake.rufusmai.com/umami.js" data-website-id="45dab984-6297-4ce7-97f0-2e203a83260e" data-domains="zeig.ml" />
      </Head>

      <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Component {...pageProps} />
      </div>
      {process.env.NODE_ENV === 'development' &&
      <style>{`
          .firebase-emulator-warning {
            display: none
          }
        `}</style>
      }
    </ThemeProvider>
  )
}

export default MyApp
