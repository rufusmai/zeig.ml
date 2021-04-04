import * as admin from 'firebase-admin'
import { Request, Response } from 'express'

export default async (request: Request, response: Response) => {
  const {
    params: { slug }
  } = request

  const entry = admin.database().ref(`routes/${slug}`);
  const result = await entry.get()
  const val = result.val()

  if (val.password) {
    response.redirect(`/authorize?slug=${encodeURIComponent(slug)}`)
    return
  }

  response.redirect(val.url);
  entry.update({
    visits: admin.database.ServerValue.increment(1)
  })
}
