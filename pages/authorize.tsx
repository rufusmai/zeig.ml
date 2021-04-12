import { ChangeEvent, FormEvent, Fragment, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import SmallHeader from '../components/layout/smallHeader'
import { authorizeRoute } from '../lib/api'
import { useRouter } from '../lib/router'

const Authorize: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query

  if (!slug || typeof slug !== 'string') {
    if (process.browser) {
      router.push('/')
    }

    return null
  }

  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    authorizeRoute(slug, password)
      .then((route) => {
        window.location.href = route.url
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            handlePasswordError()
          } else if (error.response.status === 404) {
            router.push({
              pathname: '/error',
              query: { slug, status: 404 }
            })
          }
        }
      })
  }

  const handlePasswordError = () => {
    setPassword('')
    setHasError(true)

    setTimeout(() => setHasError(false), 3000)
  }

  return (
    <Fragment>
      <Head>
        <title>Zugangsdaten benötigt | zeig.ml</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <main className="flex flex-wrap flex-col min-h-screen w-full md:container">
        <SmallHeader />

        <form onSubmit={handleSubmit} className="mt-32 text-center">
          <h3 className="font-bold text-4xl">
            zeig.ml/{slug}
          </h3>
          <span className="text-gray-400">
            benötigt ein Passwort
          </span>

          <div className="mt-10">
            <input
              type="password"
              placeholder="••••••••"
              className={`block mx-auto bg-transparent text-center focus:outline-none font-bold text-4xl transition-placeholder ${hasError ? 'placeholder-red-400' : 'placeholder-gray-500'}`}
              autoComplete="current-password"
              value={password}
              onInput={handleInput}
              autoFocus
            />
            <div className="mt-4 font-semibold text-sm text-gray-500">
              Drücke ENTER zum bestätigen
            </div>
          </div>
        </form>
      </main>
    </Fragment>
  )
}

Authorize.getInitialProps = ({ query }: NextPageContext) => {
  return { query }
}

export default Authorize
