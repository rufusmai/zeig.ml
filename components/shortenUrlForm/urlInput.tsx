import React, { ChangeEvent } from 'react'
import { LinkIcon, BackspaceIcon, CheckIcon } from '@heroicons/react/outline'
import { ExclamationIcon } from '@heroicons/react/solid'

type Props = {
  url: string,
  setUrl: (url: string) => void,
  onClose: () => void,
  urlSet: boolean,
  urlValid: boolean,
  loading: boolean,
  done: boolean
}

const UrlInput: React.FC<Props> = ({ url, setUrl, onClose, urlSet, urlValid, loading, done }) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value.replace(' ', ''))

  return (
    <div className="flex items-start">
      <LinkIcon
        className={`flex-none w-10 h-10 mr-2 ${!urlSet ? 'text-gray-400 dark:text-gray-500' : 'hidden sm:block'} transition-color duration-200 ease-in-out`}
      />
      <div className={`transition-max-width duration-300 ease-in-out sm:w-full ${urlSet ? 'max-w-screen sm:max-w-[35rem]' : 'max-w-[15rem]'}`}>
        <label className="sm:w-full flex items-center">
          <span className="hidden">Url kürzen</span>
          <input
            type="text"
            placeholder="URL kürzen..."
            className="min-w-0 w-full h-12 -mt-1 mr-2 text-4xl font-bold bg-transparent border-none focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
            value={url}
            onInput={handleInput}
            disabled={done}
            autoComplete="url"
            autoFocus
          />
          {urlSet && !loading && !done &&
            <button type="button" onClick={onClose} className={`focus:outline-none ${urlValid && 'hidden sm:block'}`}>
            <BackspaceIcon className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 self-center w-8 h-8 transition-colors duration-200 ease-in-out" />
          </button>
          }
        </label>
        {urlSet && !loading && !done &&
        <span className="font-semibold text-gray-400 dark:text-gray-500">
          {!urlValid ?
            <span className="italic">
              <ExclamationIcon className="inline-block w-5 h-5 mr-1 text-yellow-500" />
              Ungültige URL
            </span> : <span className="hidden sm:block">Klicke ENTER zum erstellen</span>
          }
        </span>
        }
      </div>
      {urlSet && urlValid && !loading && !done &&
        <button
          type="submit"
          title={urlValid ? 'Kurze URL erstellen' : 'Bitte korrigiere die URL'}
          className="ml-1 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 ease-in-out focus:outline-none"
        >
          <CheckIcon className="w-10 h-10" />
        </button>
      }
    </div>
  )
}

export default UrlInput
