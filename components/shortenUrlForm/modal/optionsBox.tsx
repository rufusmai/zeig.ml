import {useEffect, Fragment, ChangeEvent} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {LockClosedIcon, CheckIcon} from '@heroicons/react/solid'
import {SelectorIcon, BackspaceIcon} from '@heroicons/react/outline'
import {checkSlug, UrlVisibility} from '../../../lib/api'
import {validateSlug} from '../../../lib/slug'

const defaultSlugLenght = 12;

type Props = {
    slug: string,
    randomSlug: string,
    setSlug: (slug: string) => void,
    password?: string,
    setPassword: (enable?: string | undefined) => void,
    visibility: UrlVisibility,
    setVisibility: (visibility: UrlVisibility) => void,
    visibilities: UrlVisibility[],
    slugError: number | undefined,
    setSlugError: (valid: number | undefined) => void
}

const getErrorMessage = (error: number | undefined): string => {
    switch (error) {
        case 400:
            return 'Diese URL ist bereits vergeben!'
        case 422:
            return 'Nur Buchstaben, Zahlen und (Unter-)Striche sind erlaubt!'
        default:
            return 'Diese URL ist ungültig'
    }
}

const OptionsBox: React.FC<Props> = ({
                                         slug,
                                         randomSlug,
                                         setSlug,
                                         password,
                                         setPassword,
                                         visibility,
                                         setVisibility,
                                         visibilities,
                                         slugError,
                                         setSlugError
                                     }) => {
    const handleSlugInput = (e: ChangeEvent<HTMLInputElement>) => {
        const slug = e.target.value

        if (e.target.value && !validateSlug(slug)) {
            setSlugError(422)
        } else {
            setSlugError(undefined)
        }

        if (slug.length < defaultSlugLenght) {
            setSlug(slug)
        }
    }
    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const enablePassword = (enable: boolean) => setPassword(enable ? '' : undefined)
    const checkSlugError = async (slug: string) => {
        if (!await checkSlug(slug)) {
            setSlugError(400)
        }
    }

    useEffect(() => {
        if (slug && !slugError) {
            const timeOutId = setTimeout(() => checkSlugError(slug), 500)
            return () => clearTimeout(timeOutId)
        }
    })

    return (
        <div className="flex flex-wrap sm:flex-nowrap">
            <div className="mr-3 w-full">
                <span className="text-sm text-gray-500 dark:text-gray-400">Short-URL:</span>
                <div className="text-2xl relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <span className="font-semibold text-gray-400 dark:text-gray-400">
              zeig.ml/
            </span>
                    </div>
                    <input
                        type="text"
                        className={`pl-24 font-bold min-w-0 w-full focus:outline-none bg-transparent placeholder-gray-300 dark:placeholder-gray-500 leading-tight transition-colors duration-200 ease-in-out`}
                        placeholder={randomSlug}
                        value={slug}
                        onInput={handleSlugInput}
                        autoComplete="off"
                    />
                </div>
                <Transition
                    show={!!slugError}
                    enter="transition-opacity duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="text-xs text-red-500 dark:text-red-400">
                        {getErrorMessage(slugError)}
                    </div>
                </Transition>

                <div className="mt-2">
                    {password !== undefined
                        ? <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Passwort:</span>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="block text-2xl min-w-0 w-full font-bold bg-transparent focus:outline-none placeholder-gray-300 dark:placeholder-gray-500 leading-tight"
                                    placeholder="••••••••"
                                    onInput={handlePasswordInput}
                                    autoComplete="new-password"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    className="absolute text-gray-300 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-200 right-0 top-1/2 transform -translate-y-1/2 transition-colors ease-in-out duration-200 focus:outline-none"
                                    onClick={() => enablePassword(false)}
                                >
                                    <BackspaceIcon className="h-5 w-5"/>
                                </button>
                            </div>
                        </div>
                        : <button
                            type="button"
                            className="text-blue-500 dark:text-blue-400 text-sm font-semibold focus:outline-none"
                            onClick={() => enablePassword(true)}
                        >
                            <LockClosedIcon className="inline-block w-4 h-4 -mt-0.5 mr-1"/>
                            Mit Passwort schützen
                        </button>
                    }
                    {slug.length === defaultSlugLenght - 1 ?
                        <strong className={"pl-4 text-red-500 hover:text-red-300"}>
                            Deine URL darf nicht länger sein!
                        </strong>
                        : slug.length > defaultSlugLenght - 4 ?
                            <strong className={"pl-4 text-red-300 hover:text-red-400"}>
                                Deine URL ist gleich zu lang!
                            </strong>
                            : undefined
                    }
                </div>
            </div>
            <div className="relative text-left sm:text-right flex-none w-full sm:w-36 mt-2 sm:mt-0 sm:ml-auto">
                <span className="text-sm text-gray-500 dark:text-gray-400">Sichtbarkeit:</span>
                <Listbox value={visibility} onChange={value => setVisibility(value)}>
                    {({open}) => (
                        <>
                            <Listbox.Button
                                className="w-full min-w-min sm:w-auto ml-auto mt-1 flex items-center justify-between dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring focus:outline-none shadow-sm pl-3 pr-2 py-2">
                                <span className="flex-none">{visibility.name}</span>
                                <SelectorIcon className="w-5 h-5 text-gray-400 flex-none"/>
                            </Listbox.Button>
                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options
                                    static
                                    className="absolute text-left w-full focus:outline-none py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-lg shadow-sm"
                                >
                                    {visibilities.map((visibility: UrlVisibility) => (
                                        <Listbox.Option as={Fragment} key={visibility.id} value={visibility}>
                                            {({active, selected}) => (
                                                <li className={`relative px-3 py-2 pr-9 ${active && `bg-gray-100 dark:bg-gray-700`} ${selected && 'bg-gray-200 dark:bg-gray-600'}`}>
                                                    {visibility.name}

                                                    {selected &&
                                                        <span
                                                            className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <CheckIcon className="w-5 h-5"/>
                          </span>
                                                    }
                                                </li>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </>
                    )}
                </Listbox>
            </div>
        </div>
    )
}

export default OptionsBox
