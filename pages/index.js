import Head from 'next/head'
import Image from 'next/image'
import { CursorClickIcon } from '@heroicons/react/outline'
import ShortenUrlForm from '../components/shortenUrlForm'
import GithubLogo from '../components/icons/githubLogo.svg'

export default function Home() {
  return (
    <div className="relative h-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
      <Head>
        <title>zeig.ml | URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div className="flex flex-col h-full container">
        <main className="h-full">
          <header className="relative my-8">
            <div className="absolute z-0 sm:-top-10 md:-top-20 w-full flex justify-center" style={{filter: 'blur(50px)'}}>
              <Image src="/logo_bg.png" width={600} height={400} />
            </div>

            <div className="relative z-20">
              <div className="bg-white bg-opacity-50 dark:bg-opacity-50 dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-500 w-20 h-20 mx-auto text-gray-600 dark:text-blue-100 shadow-sm p-3">
                <CursorClickIcon />
              </div>

              <h1 className="mt-2 text-6xl text-center font-bold">
                <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">zeig.ml</span>
                <small className="block mt-2 text-gray-500 dark:text-gray-400 font-semibold text-2xl">
                  Zeig mal, <span className="inline-block rounded-lg bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-600 dark:to-gray-700 w-16 h-8 animate-pulse">...</span> ?!
                </small>
              </h1>
            </div>
          </header>

          <div className="flex justify-center mt-14 sm:mt-32">
            <ShortenUrlForm />
          </div>
        </main>
        <footer className="text-center text-gray-500 dark:text-gray-400 mt-auto p-2">
          <div className="inline-flex items-center">
            von
            <a href="https://rufusmai.com" target="_blank" className="flex items-center ml-2 font-semibold text-lg text-gray-900 dark:text-gray-100 hover:text-gray-600 shadow-sm transition-colors duration-200 ease-in-out">
              <div className="relative inline bg-white dark:bg-gray-800 rounded h-6 w-6 border border-gray-400 dark:border-gray-500 mr-1 overflow-hidden">
                <Image src="/avatar.svg" layout="fill" alt="rufusmai Avatar" className="" />
              </div>
              rufusmai
            </a>
          </div>
          <div>
            <a href="https://github.com/rufusmai/zeig.ml" target="_blank" rel="noopener" className="inline-block text-xs hover:underline mt-1">
              Auf Github ansehen
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
