import { Request, Response } from 'express'
import { getUrlRoute, UrlRoute } from '../lib/db'
import * as admin from 'firebase-admin'

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

        if (req.query.visit) {
          console.log(req.query)
          admin
              .database()
              .ref(`routes/${slug}`)
              .update({
                visits: admin.database.ServerValue.increment(1),
              })
        }
      })
      .catch(() => {
        res.status(404).json({
          msg: 'Url with that slug does not exist!',
        }).end()
      })
}
