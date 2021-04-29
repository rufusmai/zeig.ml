import { Request, Response } from 'express'
import { getUrlRoute, UrlRoute } from '../lib/db'
import * as admin from 'firebase-admin'

/**
 * Returns public data for a specific shortened url that will be determined by the slug query parameter
 * Should be used with a middleware that authorizes password protected urls
 *
 * @param {Request} req
 * @param {Response} res
 */
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
