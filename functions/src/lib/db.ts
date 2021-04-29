import * as admin from 'firebase-admin'
import { database } from 'firebase-admin/lib/database'
import moment from 'moment'

/**
 * The data that a shortened URL can hold
 */
export type UrlRoute = {
  /**
   * the slug must be in a base64url format like validated [here]{@link validateSlug}
   */
  slug: string,
  /**
   * the uid identify the creator of this shortened url
   */
  uid: string,
  /**
   * must be a valid url
   */
  url: string
  /**
   * timestamp where shortened url was created
   */
  created: number,
  /**
   * password which must be provided if resolving of shortened url is requested
   * only the owners {@link uid} can access all data without providing a password
   */
  password?: string,
  /**
   * timestamp until then this shortened url is valid.
   * After that period this url cannot be resolved anymore and will be deleted
   */
  validUntil?: number
}

/**
 * Searches for any shortened url by the unique slug
 * Returns a Promise which resolves with the found {@link UrlRoute}, rejects otherwise
 *
 * @param {string} slug
 * @return {Promise<UrlRoute>} found route or rejects if no route could be found
 */
export const getUrlRoute = (slug: string): Promise<UrlRoute> => {
  return new Promise<UrlRoute>(((resolve, reject) => {
    const ref = admin.database().ref(`routes/${slug}`)

    ref.once('value')
        .then(async (result: database.DataSnapshot) => {
          if (!result.exists()) {
            reject(new Error('Url does not exist'))
          }

          const val = result.val()

          if (val && val.validUntil < moment().unix()) {
            reject(new Error('Url is outdated'))
            await ref.remove()
          }

          resolve(val)
        })
        .catch((err) => reject(err))
  }))
}

/**
 * Returns all {@link UrlRoute}s a uid has created
 *
 * @param {string} uid firebase auth uid
 * @return {Promise<{UrlRoute}>} all routes the user has created
 */
export const getUrlRoutesOfUser = async (uid: string): Promise<{ [slug: string]: UrlRoute }> => {
  const snapshot = await admin
      .database()
      .ref('routes')
      .orderByChild('uid')
      .equalTo(uid)
      .get()

  return snapshot.val() ?? {}
}
