import * as admin from 'firebase-admin'
import * as moment from 'moment'
import { database } from 'firebase-admin/lib/database'
import DataSnapshot = database.DataSnapshot

export type UrlRoute = {
  slug: string,
  url: string
  created: number,
  password?: string,
  validUntil?: number
}

export const getUrlRoute = (slug: string): Promise<UrlRoute | undefined> => {
  return new Promise<UrlRoute | undefined>(((resolve, reject) => {
    const ref = admin.database().ref(`routes/${slug}`)

    ref.once('value')
        .then(async (result: DataSnapshot) => {
          const val = result.val()

          if (val && val.validUntil < moment().unix()) {
            resolve(undefined)
            await ref.remove()
          }

          resolve(val)
        })
        .catch((err) => reject(err))
  }))
}
