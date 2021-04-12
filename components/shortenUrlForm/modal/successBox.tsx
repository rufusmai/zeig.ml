import { useEffect, useState } from 'react'
import { CheckIcon, ClipboardCopyIcon } from '@heroicons/react/outline'
import { CursorClickIcon } from '@heroicons/react/solid'
import firebase from 'firebase'
import { getRoute } from '../../../lib/firebase'
import { UrlRoute } from '../../../functions/src/lib/db'

type Props = {
  shortUrl: UrlRoute,
  onClose: () => void
}

const SuccessBox: React.FC<Props> = ({ shortUrl, onClose }) => {
  const [copied, setCopied] = useState<boolean|null>(null)
  const [visits, setVisits] = useState(0)

  useEffect(() => {
    if (shortUrl) {
      const ref = getRoute(shortUrl.slug)

      ref.on('value', (snapshot: firebase.database.DataSnapshot) => {
        setVisits(snapshot.val())
      })

      return () => ref.off()
    }
  })

  const copyUrl = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl.url)
        .then(() => setCopied(true))
        .catch(() => setCopied(false))
        .finally(() => setTimeout(() => setCopied(null), 3000))
    }
  }

  return (
    <>
      <div className="flex flex-wrap text-center sm:text-left items-center justify-center">
        <CheckIcon className="hidden sm:block w-16 h-16 text-green-500 dark:text-green-400" />
        <div className="sm:ml-3 w-full sm:w-auto">
          <div className="text-green-600 dark:text-green-400 text-sm">Deine Url ist live!</div>
          <div className="inline-block group relative pr-8">
            <a className="block text-2xl font-semibold break-words" href={shortUrl.url} target="_blank" rel="noopener">
              zeig.ml/{shortUrl.slug}
            </a>
            <button
              type="button"
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100 transition-colors ease-in-out duration-200 focus:outline-none ${copied ? 'text-green-500 dark:text-green-400 hover:text-green-500 dark:hover:text-green-400' : (copied === false && 'text-red-500 dark:text-red-400 hover:text-red-500 dark:hover:text-red-400')}`}
              title="URL kopieren"
              onClick={copyUrl}
            >
              <ClipboardCopyIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="sm:ml-auto sm:text-right mt-4 sm:mt-0">
          <div>
            <span
              className="inline-flex items-center mr-1 text-xs py-0.5 px-1 bg-gray-100 dark:bg-gray-900 rounded text-gray-400 uppercase">
              <span className="flex items-center mr-1 relative h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-blue-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 dark:bg-blue-400" />
              </span>
              Live
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Aufrufe
            </span>
          </div>
          <div className="text-2xl font-semibold">
            {visits ?? '-'}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="mt-4 sm:mt-2 mx-auto sm:mx-0 flex items-center text-blue-500 dark:text-blue-400 text-sm font-semibold focus:outline-none hover:text-blue-400 dark:hover:text-blue-300 transition-colors ease-in-out duration-200"
        onClick={onClose}
      >
        <CursorClickIcon className="w-4 h-4 inline-block mr-1" />
        Neue Url kürzen
      </button>
    </>
  )
}

export default SuccessBox
