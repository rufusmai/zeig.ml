import Link from 'next/link'
import { CursorClickIcon } from '@heroicons/react/outline'

const SmallHeader = () => {
  return (
    <header className="relative my-8">
      <div className="absolute z-0 -top-16 w-full flex justify-center" style={{filter: 'blur(50px)'}}>
        <img src="/logo_bg.png" width="400" height="200" alt="Blurry background accent" />
      </div>

      <Link href="/">
        <a>
          <div className="relative flex items-center justify-center z-20">
            <div className="bg-white bg-opacity-50 dark:bg-opacity-50 dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-500 w-16 h-16 text-gray-600 dark:text-blue-100 shadow-sm p-2">
              <CursorClickIcon className="drop-shadow-logo" />
            </div>

            <h1 className="text-6xl ml-3 font-bold text-transparent bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text pb-5 -mb-5">
              zeig.ml
            </h1>
          </div>
          <h3 className="mt-2 text-center text-2xl text-gray-100 text-opacity-75">URL Shortener</h3>
        </a>
      </Link>
    </header>
  )
}

export default SmallHeader
