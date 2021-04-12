import { CursorClickIcon } from '@heroicons/react/outline'

const Header = () => {
  return (
    <header className="relative my-8">
      <div className="absolute z-0 sm:-top-10 md:-top-20 w-full flex justify-center" style={{filter: 'blur(50px)'}}>
        <img src="/logo_bg.png" width="600" height="400" alt="Blurry background accent" />
      </div>

      <div className="relative z-20">
        <div className="bg-white bg-opacity-50 dark:bg-opacity-50 dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-500 w-20 h-20 mx-auto text-gray-600 dark:text-blue-100 shadow-sm p-3">
          <CursorClickIcon className="drop-shadow-logo" />
        </div>

        <h1 className="mt-2 text-6xl text-center font-bold">
          <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">zeig.ml</span>
          <small className="block mt-2 text-gray-500 dark:text-gray-400 font-semibold text-2xl">
            Zeig' mal, <span className="inline-block rounded-lg bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-600 dark:to-gray-700 w-16 h-8 animate-pulse">...</span> ?!
          </small>
        </h1>
      </div>
    </header>
  )
}

export default Header
