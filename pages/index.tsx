import Head from 'next/head'
import ShortenUrlForm from '../components/shortenUrlForm/shortenUrlForm'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'
import { Fragment } from 'react'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>zeig.ml | URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <main className="flex flex-wrap flex-col min-h-screen w-full md:container">
        <Header />

        <div className="mt-14 sm:mt-32">
          <ShortenUrlForm />
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </main>
    </Fragment>
  )
}

export default Home
