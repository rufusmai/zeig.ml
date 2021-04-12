import { Request, Response } from 'express'
import { getUrlRoute, UrlRoute } from '../lib/db'

export default (req: Request, res: Response): void => {
  const {
    params: { slug },
  } = req

  getUrlRoute(slug)
      .then((route: UrlRoute) => {
        res.json({
          slug: route.slug,
          url: route.url,
          password: Object.prototype.hasOwnProperty.call(route, 'password'),
          created: route.created,
          validUntil: route.validUntil,
        })
      })
      .catch(() => {
        res.status(404).json({
          msg: 'Url with that slug does not exist!',
        }).end()
      })
}
