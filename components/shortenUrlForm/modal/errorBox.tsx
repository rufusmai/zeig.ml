import { LockClosedIcon } from '@heroicons/react/outline'
import { ChatAltIcon } from '@heroicons/react/solid'

const ErrorBox = () => {
  return (
    <div className="flex">
      <LockClosedIcon className="w-16 h-16 text-gray-400 dark:text-gray-600" />
      <div className="ml-3">
        <h1 className="text-2xl font-bold max-w-sm">
          Du hast das Limit von 5 Anfragen pro Tag erreicht!
        </h1>
        <p className="text-sm mt-2">
          Gefällt dir dieser URL-Shortener?
          <br />
          Schreibe mir deine Meinung und erhalte kostenlosen Zugang zu mehr URLs!
        </p>
        <a
          href="https://rufusmai.com/contact"
          className="mt-2 flex items-center text-blue-500 dark:text-blue-400 text-sm font-semibold focus:outline-none hover:text-blue-400 dark:hover:text-blue-300 transition-colors ease-in-out duration-200"
          target="_blank"
          rel="noopener"
        >
          <ChatAltIcon className="w-4 h-4 inline-block mr-1" />
          Nachricht schreiben
        </a>
      </div>
    </div>
  )
}

export default ErrorBox
