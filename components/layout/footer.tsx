import Avatar from '../icons/avatar.svg'

const Footer = () => {
  return (
    <footer className="text-center text-gray-500 dark:text-gray-400 mt-5 p-2">
      <div className="inline-flex items-center">
        von
        <a href="https://rufusmai.com" target="_blank" className="flex items-center ml-2 font-semibold text-lg text-gray-900 dark:text-gray-100 hover:opacity-80 shadow-sm transition-opacity duration-200 ease-in-out">
          <div className="relative inline bg-white dark:bg-gray-800 rounded h-6 w-6 border border-gray-400 mr-1 overflow-hidden">
            <Avatar />
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
  )
}

export default Footer
