import * as admin from 'firebase-admin'
import { Request, Response } from 'express'
import { UrlRoute } from '../lib/db'

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
