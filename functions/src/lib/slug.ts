import { getRandomSlug, validateSlug } from '../../../lib/slug'
import { NextFunction, Request, Response } from 'express'
import { getUrlRoute } from './db'

/**
 * Middleware that validated the slug
 * This used the {@link validateSlug} function to determine if slug is valid base64url
 * and does not contain reserved words.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const validateSlugMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { slug } = req.params

  if (!validateSlug(slug)) {
    if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
      res
          .status(400)
          .json({
            msg: 'Invalid slug!',
          })
    } else {
      res.redirect(`/error?slug=${encodeURIComponent(slug)}&status=422`)
    }
    return
  }

  next()
}

/**
 * Takes a slug and check if its available.
 * Use replaceIfExists to automatically return a fresh generated unique slug.
 * Returns the valid slug. Rejects otherwise.
 *
 * @param {string} custom slug that should be checked
 * @param {boolean} replaceIfExists if true this function returns a valid slug (may be a new one)
 * @return {Promise<string>} a valid slug
 */
export const getSlug = async (custom?: string, replaceIfExists?: boolean): Promise<string> => {
  let slug: string | undefined
  if (custom) {
    if (await checkSlug(custom)) {
      if (!replaceIfExists) {
        throw new Error('Slug not available')
      }
    } else {
      slug = custom
    }
  }

  if (!slug) {
    let randSlug

    do {
      randSlug = getRandomSlug()
    } while (!await checkSlug(randSlug))

    slug = randSlug
  }

  return <string> slug
}

/**
 * Checks if the given slug is still available
 *
 * @param {string} slug
 * @return {Promise<boolean>} true if slug is not taken
 */
const checkSlug = async (slug: string): Promise<boolean> => {
  try {
    await getUrlRoute(slug)
    return true
  } catch (error) {
    return false
  }
}
