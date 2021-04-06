import { Request, Response } from 'express'
import { getUrlRoute, UrlRoute } from '../lib/db'

export default async (req: Request, res: Response): Promise<void> => {
  const {
    params: { slug },
  } = req

  const route: UrlRoute | undefined = await getUrlRoute(slug)

  if (!route) {
    res.status(404).json({
      msg: 'Url with that slug does not exist!',
    })
    return
  }

  res.json({
    slug: route.slug,
    url: route.url,
    password: Object.prototype.hasOwnProperty.call(route, 'password'),
    created: route.created,
    validUntil: route.validUntil,
  })
}
