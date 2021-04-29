const bas64url = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

/**
 * checks if input is valid base64url
 */
const slugRegex = /^[A-Za-z0-9\-_]*$/

/**
 * All reserved words, that can not be used as slug
 * These may be used as internal urls
 */
const forbiddenSlugs = ['url', 'dashboard', 'authorize', 'error', 'api', 'docs', 'app']

/**
 * Generates a valid random (not unique) slug
 *
 * @param length=6 this should be left to the default of 6
 */
export const getRandomSlug = (length = 6): string => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += bas64url.charAt(
      Math.floor(Math.random() * bas64url.length)
    )
  }

  return result
}

/**
 * Validated the slug
 * Checks if it only contains valid chars and rejects reserved words that are used for internal urls
 *
 * @param slug
 */
export const validateSlug = (slug: string): boolean => slugRegex.test(slug) && !forbiddenSlugs.includes(slug)
