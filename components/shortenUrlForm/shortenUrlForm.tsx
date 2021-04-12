import React, { FormEvent, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import UrlInput from './urlInput'
import Modal from './modal/modal'
import OptionsBox from './modal/optionsBox'
import LoadingSkeleton from './modal/loadingSkeleton'
import ErrorBox from './modal/errorBox'
import SuccessBox from './modal/successBox'
import { shortenUrl, UrlVisibility } from '../../lib/api'
import { getRandomSlug } from '../../lib/slug'
import { UrlRoute } from '../../functions/src/lib/db'

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/
const visibilities: UrlVisibility[] = [
  { id: 'infinite', name: 'Immer', time: -1 },
  { id: '5min', name: '5 Minuten', time: 5 },
  { id: '15min', name: '15 Minuten', time: 15 },
  { id: '1h', name: 'Eine Stunde', time: 60 },
  { id: '1d', name: 'Ein Tag', time: 60 * 24 },
]
const randomSlug: string = getRandomSlug()

const ShortenUrlForm: React.FC = () => {
  const [url, setUrl] = useState('')
  const [urlSet, setUrlSet] = useState(false)
  const [urlValid, setUrlValid] = useState(false)
  const [slug, setSlug] = useState('')
  const [slugValid, setSlugValid] = useState(true)
  const [visibility, setVisibility] = useState(visibilities[0])
  const [password, setPassword] = useState<string|undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [shortUrl, setShortUrl] = useState<UrlRoute|undefined>(undefined)
  const [limitReached, setLimitReached] = useState(false)

  const reset = () => {
    setUrl('')
    setSlug('')
    setSlugValid(true)
    setVisibility(visibilities[0])
    setPassword(undefined)
    setLoading(false)
    setShortUrl(undefined)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (slugValid && !loading && !shortUrl) {
      setLoading(true)

      shortenUrl({
        slug: slug ? slug : randomSlug,
        replaceSlugIfExists: !slug,
        visibility,
        url,
        password
      }).then((shortUrl: UrlRoute) => {
        setShortUrl(shortUrl)
      }).catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            setSlugValid(false)
          } else if (error.response.status === 429) {
            setLimitReached(true)
          }
        }
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  useEffect(() => setUrlSet(url.length > 0))
  useEffect(() => setUrlValid(urlRegex.test(url)))

  let option
  if (!shortUrl && !loading && !limitReached) {
    option = <OptionsBox
      slug={slug}
      randomSlug={randomSlug}
      setSlug={setSlug}
      password={password}
      setPassword={setPassword}
      visibility={visibility}
      setVisibility={setVisibility}
      visibilities={visibilities}
      slugValid={slugValid}
      setSlugValid={setSlugValid}
    />
  } else if (limitReached) {
    option = <ErrorBox />
  } else if (loading) {
    option = <LoadingSkeleton />
  } else if (shortUrl) {
    option = <SuccessBox
      shortUrl={shortUrl}
      onClose={reset}
    />
  }

  return (
    <div className="flex flex-wrap justify-center">
      <form className="relative z-10 mx-2" onSubmit={handleSubmit}>
        <UrlInput
          url={url}
          setUrl={setUrl}
          onClose={reset}
          urlSet={urlSet}
          urlValid={urlValid}
          loading={loading}
          done={!!shortUrl}
        />

        <Transition
          show={urlSet && urlValid}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Modal valid={slugValid && !limitReached}>
            {option}
          </Modal>
        </Transition>
      </form>
    </div>
  )
}

export default ShortenUrlForm
