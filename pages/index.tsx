import ShortenUrlForm from '../components/shortenUrlForm/shortenUrlForm'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main className="flex flex-wrap flex-col min-h-screen w-full md:container">
      <Header />

      <div className="mt-14 sm:mt-32">
        <ShortenUrlForm />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  )
}

export default Home
