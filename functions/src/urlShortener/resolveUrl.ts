import * as admin from 'firebase-admin'
import { Request, Response } from 'express'
import { UrlRoute } from '../lib/db'

/**
 * Redirects to the target url that this shortened url points to.
 * The short url is determined by the slug query string parameter.
 * If the slug is invalid or password protected, this will redirect to the error page.
 *
 * @param {Request} request
 * @param {Response} response
 */
export default async (request: Request, response: Response): Promise<void> => {
  const {
    params: { slug },
  } = request

  const entry = admin.database().ref(`routes/${slug}`)
  const result = await entry.get()

  if (!result.exists()) {
    response.redirect(`/error?slug=${encodeURIComponent(slug)}&status=404`)
    return
  }

  const route: UrlRoute = result.val()

  if (route.password) {
    response.redirect(`/authorize?slug=${encodeURIComponent(slug)}`)
    return
  }

  response.redirect(route.url)
  entry.update({
    visits: admin.database.ServerValue.increment(1),
  })
}
