import * as admin from 'firebase-admin'
import { Request, Response } from 'express'
import { getSlug } from '../lib/slug'
import { hashPassword } from '../lib/auth/password'
import * as moment from 'moment'

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
          msg: err,
        })
    return
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
    created: moment().unix(),
    password: body.password ? await hashPassword(body.password) : null,
    validUntil: body.validUntil ?? null,
    visits: 0,
  })

  response.json({
    msg: 'Successfully saved url!',
    url: `https://${request.hostname}/${slug}`,
    slug,
    password: Object.hasOwnProperty.call(body, 'password'),
    validUntil: body.validUntil ?? null,
  })
}
