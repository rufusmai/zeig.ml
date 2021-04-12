import axios, { AxiosInstance } from 'axios'
import { getUserOrCreate } from './firebase'
import { UrlRoute } from '../functions/src/lib/db'

const http: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : undefined
})

export type UrlVisibility = {
  id: string,
  name: string,
  time: number
}

export type ShortenUrlConfig = {
  slug: string,
  replaceSlugIfExists: boolean,
  visibility?: UrlVisibility,
  url: string,
  password?: string,
  validUntil?: Date
}

export const shortenUrl = async ({slug, replaceSlugIfExists, visibility, url, password}: ShortenUrlConfig): Promise<UrlRoute> => {
  const options: ShortenUrlConfig = {
    slug,
    replaceSlugIfExists,
    url,
    password
  }

  if (visibility && visibility.id !== 'infinite') {
    const date = new Date()
    date.setTime(date.getTime() + (visibility.time * 60 * 1000))

    options.validUntil = date
  }

  const user = await getUserOrCreate()
  const token = await user.getIdToken()

  const { data } = await http.post('/url', options, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return data
}

export const checkSlug = async (slug: string): Promise<boolean> => {
  const response = await http.get(`/url/${slug}`, {
    validateStatus: null
  })

  return response.status === 404
}

export const authorizeRoute = async (slug: string, password: string): Promise<UrlRoute> => {
  const auth = btoa(`:${password}`)
  const response = await http.get(`/url/${slug}`, {
    params: {
      visit: true
    },
    headers: {
      authorization: `Basic ${auth}`
    }
  })

  return response.data
}
