import * as admin from 'firebase-admin'
import { auth } from 'firebase-admin/lib/auth'
import { Request, Response } from 'express'
import moment from 'moment'
import { getUrlRoutesOfUser, UrlRoute } from '../lib/db'
import { getSlug } from '../lib/slug'
import { hashPassword } from '../lib/auth/password'
import { getUser } from '../lib/auth/firebase'
import { validateSlug } from '../../../lib/slug'
import { validateUrl } from '../../../lib/url'

/**
 * Maximum amount of urls a user can shorten if he is not premium
 */
const URL_USER_LIMIT = 5

/**
 * All parameters that can be submitted in the request body when initiating a shorten url request
 */
type ShortenUrlRequest = {
  /**
   * Must be a valid url with one exception: http(s) is not required and will be added automatically
   */
  url: string,
  /**
   * Must be a valid slug {@link validateSlug}
   */
  slug?: string,
  /**
   * if true a fresh valid slug will be generated if the given slug is already taken
   */
  replaceSlugIfExists?: boolean,
  /**
   * timestamp until when the created shorten url will be resolveable
   * if null, the url is valid infinite
   */
  validUntil?: number,
  /**
   * password that every visitor will be prompted before redirect to the target url
   * if null, the user is directly redirected
   */
  password?: string
}

/**
 * Create a new shortened url.
 * A firebase id token should be verified before to only allow this to authenticated users.
 * The request body can be like {@link ShortenUrlRequest}
 *
 * @param {Request} request
 * @param {Response} response
 */
export default async (request: Request, response: Response): Promise<void> => {
  const body: ShortenUrlRequest = request.body

  if (!(body && body.url)) {
    response
        .status(400)
        .json({
          msg: 'Missing parameters',
        })
    return
  }

  if (!validateUrl(body.url)) {
    response
        .status(400)
        .json({
          msg: 'Invalid URL',
        })
    return
  }

  // Add https if http(s) protocol is missing in url
  if (!/https?/.test(body.url)) {
    body.url = `https://${body.url}`
  }

  if (body.slug && !validateSlug(body.slug)) {
    response
        .status(422)
        .json({
          msg: 'Invalid Slug!',
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

  // get user data from id token middleware
  const user: auth.DecodedIdToken = getUser()

  // abort if user is not premium and has its limit exceeded
  if (user.premium !== true) {
    let count = 0

    const minDate = moment().subtract(1, 'd').unix()
    const routes: { [slug: string]: UrlRoute } = await getUrlRoutesOfUser(user.sub)

    // count routes
    for (const route of Object.values(routes)) {
      if (route.created > minDate) {
        count++
      }
    }

    if (count >= URL_USER_LIMIT) {
      response
          .status(429)
          .json({
            msg: 'Max url count exceeded!',
          })
      return
    }
  }

  // verify and format validUntil
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
