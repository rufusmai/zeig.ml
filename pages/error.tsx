import { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from '../lib/router'
import SmallHeader from '../components/layout/smallHeader'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'

const getMessage = (status: number): string => {
  switch (status) {
    case 404: return 'Diese Url existiert nicht mehr!'
    case 422: return 'Ungültiger Slug'
    default: return 'Ein Fehler ist aufgetreten'
  }
}

const Error: NextPage = () => {
  const router = useRouter()
  const { slug, status } = router.query

  if (!slug || !status) {
    if (process.browser) {
      router.push('/')
    }

    return null
  }

  return (
    <Fragment>
      <Head>
        <title>Zugangsdaten benötigt | zeig.ml</title>
      </Head>

      <main className="flex flex-wrap flex-col min-h-screen w-full md:container">
        <SmallHeader />

        <div className="mt-32 inline-block mx-auto text-center">
          <ExclamationCircleIcon className="w-20 h-20 mx-auto text-gray-400" />
          <span className="block font-semibold text-gray-400 text-xl mt-4">
            {`https://zeig.ml/${slug}`}
          </span>
          <h2 className="text-4xl font-bold mt-2 max-w-xs text-gray-500 dark:text-gray-300">
            {getMessage(+status)}
          </h2>
          <Link href="/">
            <button className="inline-flex mt-8 items-center text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 transition ease-in-out duration-200 font-semibold focus:outline-none">
              <HomeIcon className="w-5 h-5 mr-1" />
              Startseite
            </button>
          </Link>
        </div>
      </main>
    </Fragment>
  )
}

export default Error
