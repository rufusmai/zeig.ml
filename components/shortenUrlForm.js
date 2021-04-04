import React from 'react'
import { LinkIcon, ExternalLinkIcon, XIcon, SelectorIcon } from '@heroicons/react/outline'
import { ExclamationIcon, LockClosedIcon } from '@heroicons/react/solid'
import { Transition, Listbox } from '@headlessui/react'

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/
const visibilities = [
  { id: 'infinite', name: 'Immer' },
  { id: '5min', name: '5 Minuten' },
  { id: '15min', name: '15 Minuten' },
  { id: '1h', name: 'Eine Stunde' },
  { id: '1d', name: 'Ein Tag' },
]

export default class ShortenUrlForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      slug: '',
      visibility: visibilities[0],
      usePassword: false
    }

    this.randomUrl = Math.random().toString(36).substring(7)

    this.handleValue = this.handleValue.bind(this)
    this.handleSlug = this.handleSlug.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleValue(event) {
    this.setState({ value: event.target.value })
  }

  handleSlug(event) {
    this.setState({ slug: event.target.value })
  }

  handleSubmit(event) {
    alert('Shorten: ' + this.state.value)
    event.preventDefault();
  }

  handleClear() {
    this.setState({ value: '' })
  }

  render() {
    return (
      <form className="relative z-10 mx-2" onSubmit={this.handleSubmit}>
        <div className="flex items-start">
          <LinkIcon
            className={`w-10 h-10 ${!this.state.value ? 'text-gray-400 dark:text-gray-500' : ''} transition-color duration-200 ease-in-out`}
          />
          <div className={`ml-2 transition-max-width duration-300 ease-in-out overflow-hidden w-full max-w-[15rem] ${this.state.value.length > 0 && 'max-w-[35rem]'}`}>
            <label className="w-full flex items-center">
              <span className="hidden">Url kürzen</span>
              <input
                type="text"
                placeholder="URL kürzen..."
                className="block text-4xl font-bold bg-transparent border-none focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
                value={this.state.value}
                onChange={this.handleValue}
                autoFocus
              />
              {this.state.value.length > 0 &&
                <button type="button" onClick={this.handleClear} className="focus:outline-none">
                  <XIcon className="text-gray-400 hover:text-gray-500 self-center w-8 h-8 transition-colors duration-200 ease-in-out" />
                </button>
              }
            </label>
            {this.state.value.length > 0 &&
            <span className="font-semibold text-gray-400 dark:text-gray-500">
              {!urlRegex.test(this.state.value) ?
                <span className="italic">
                  <ExclamationIcon className="inline-block w-5 h-5 mr-1 text-yellow-500" />
                  Ungültige URL
                </span> : <span className="">Klicke ENTER zum erstellen</span>
              }
            </span>
            }
          </div>
          {this.state.value.length > 0 && urlRegex.test(this.state.value) &&
            <button
              type="submit"
              title={urlRegex.test(this.state.value) ? 'Kurze URL erstellen' : 'Bitte korrigiere die URL'}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 ease-in-out focus:outline-none"
            >
                <ExternalLinkIcon className="w-10 h-10" />
            </button>
          }
        </div>
        <Transition
          show={this.state.value.length > 0 && urlRegex.test(this.state.value)}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 shadow-sm mt-2 p-3">
            <div className="flex">
              <div className="w-full">
                <span className="text-sm text-gray-500 dark:text-gray-400">Short-URL:</span>
                <div className="text-2xl relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <span className="font-semibold text-gray-400 dark:text-gray-400">
                      zeig.ml/
                    </span>
                  </div>
                  <input
                    type="text"
                    className="pl-24 font-bold focus:outline-none bg-transparent placeholder-gray-300 dark:placeholder-gray-500 leading-tight"
                    placeholder={this.randomUrl}
                    onInput={this.handleSlug}
                  />
                </div>
                <div className="text-xs text-red-400">
                  Diese URL ist bereits vergeben!
                </div>

                <div className="mt-2">
                  { this.state.usePassword
                    ? <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Passwort:</span>
                      <input
                        type="password"
                        className="block text-2xl font-bold bg-transparent focus:outline-none placeholder-gray-300 dark:placeholder-gray-500 leading-tight"
                        placeholder="••••••••"
                        autoFocus
                      />
                    </div>
                    : <button type="button" className="text-blue-500 dark:text-blue-400 text-sm font-semibold focus:outline-none" onClick={() => this.setState({ usePassword: true })}>
                      <LockClosedIcon className="inline-block w-4 h-4 -mt-0.5 mr-1" />
                      Mit Passwort schützen
                    </button>
                  }
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Sichtbarkeit:</span>
                <Listbox value={this.state.visibility} onChange={value => this.setState({ visibility: value })}>
                  <Listbox.Button className="mt-1 flex items-center dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring focus:outline-none shadow-sm pl-3 pr-2 py-2">
                    {this.state.visibility.name}
                    <SelectorIcon className="w-5 h-5 text-gray-400" />
                  </Listbox.Button>
                  <Listbox.Options>
                    {visibilities.map(visibility => (
                      <Listbox.Option key={visibility.id} value={visibility}>
                        {visibility.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            </div>
          </div>
        </Transition>
      </form>
    );
  }
}
