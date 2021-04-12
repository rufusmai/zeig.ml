import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
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
