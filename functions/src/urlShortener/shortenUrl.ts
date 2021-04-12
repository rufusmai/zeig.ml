import * as admin from 'firebase-admin'
import { auth } from 'firebase-admin/lib/auth'
import { Request, Response } from 'express'
import moment from 'moment'
import { getUrlRoutesOfUser, UrlRoute } from '../lib/db'
import { getSlug } from '../lib/slug'
import { hashPassword } from '../lib/auth/password'
import { getUser } from '../lib/auth/firebase'

export default async (request: Request, response: Response): Promise<void> => {
  const { body } = request

  if (!(body && body.url)) {
    response
        .status(400)
        .json({
          msg: 'Missing parameters',
        })
    return
  }

  let slug: string | undefined
  try {
    slug = await getSlug(body.slug, body.replaceSlugIfExists)
  } catch (err) {
    response
        .status(400)
        .json({
          msg: 'This slug already exists!',
        })
    return
  }

  const user: auth.DecodedIdToken = getUser()
  if (user.premium !== true) {
    let count = 0

    const minDate = moment().subtract(1, 'd').unix()
    const routes: { [slug: string]: UrlRoute } = await getUrlRoutesOfUser(user.sub)

    for (const route of Object.values(routes)) {
      if (route.created > minDate) {
        count++
      }
    }

    if (count >= 5) {
      response
          .status(429)
          .json({
            msg: 'Max url count exceeded!',
          })
      return
    }
  }

  if (body.validUntil) {
    const max = moment().add(1, 'day').add(1, 'minute')

    if (body.validUntil > max.unix()) {
      response
          .status(400)
          .json({
            msg: 'validUntil may not be greater than one day ahead!',
          })
      return
    }
  }

  admin.database().ref(`routes/${slug}`).set({
    url: body.url,
    uid: getUser().uid,
    created: moment().unix(),
    password: body.password ? await hashPassword(body.password) : null,
    validUntil: body.validUntil ?? null,
    visits: 0,
  })

  response.json({
    msg: 'Successfully saved url!',
    url: `https://zeig.ml/${slug}`,
    slug,
    password: !!body.password,
    validUntil: body.validUntil ?? null,
  })
}
