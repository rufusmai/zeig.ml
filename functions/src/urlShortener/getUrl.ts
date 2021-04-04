import { Request, Response } from 'express'
import { getUrlRoute, UrlRoute } from '../lib/db'

export default async (req: Request, res: Response) => {
  const {
    params: { slug }
  } = req

  const route: UrlRoute = await getUrlRoute(slug)

  res.json({
    slug: route.slug,
    url: route.url,
    password: route.hasOwnProperty('password'),
    created: route.created,
    validUntil: route.validUntil
  })
}
