import * as admin from 'firebase-admin'
import { database } from 'firebase-admin/lib/database'
import moment from 'moment'

export type UrlRoute = {
  slug: string,
  uid: string,
  url: string
  created: number,
  password?: string,
  validUntil?: number
}

export const getUrlRoute = (slug: string): Promise<UrlRoute> => {
  return new Promise<UrlRoute>(((resolve, reject) => {
    const ref = admin.database().ref(`routes/${slug}`)

    ref.once('value')
        .then(async (result: database.DataSnapshot) => {
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

export const getUrlRoutesOfUser = async (uid: string): Promise<{ [slug: string]: UrlRoute }> => {
  const snapshot = await admin
      .database()
      .ref('routes')
      .orderByChild('uid')
      .equalTo(uid)
      .get()

  return snapshot.val() ?? {}
}
