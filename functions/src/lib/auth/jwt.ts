import * as functions from 'firebase-functions'
import { UrlRoute } from '../db'
import jwt = require('jsonwebtoken')

export type Payload = {
  slug: string
}

export const issueToken = (urlRoute: UrlRoute): Promise<string> => {
  return new Promise((resolve, reject) => {
    return jwt.sign({
      slug: urlRoute.slug,
    }, functions.config().jwt.secret, (err: Error | null, token: string | undefined) => {
      if (err || !token) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

export const verifyToken = async (token: string): Promise<Payload> => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    jwt.verify(token, functions.config().jwt.secret, (err: Error | null, payload: object | undefined) => {
      if (err) {
        reject(err)
      } else {
        resolve(<Payload> payload)
      }
    })
  })
}
