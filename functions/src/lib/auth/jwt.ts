import { UrlRoute } from '../db'
import * as functions from 'firebase-functions'

const jwt = require('jsonwebtoken')

export type Payload = {
  slug: string
}

export const issueToken = (urlRoute: UrlRoute): Promise<string> => {
  return new Promise((resolve, reject) => {
    return jwt.sign({}, functions.config().jwt.secret, (err: string, token: string) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

export const verifyToken = async (token: string): Promise<Payload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, functions.config().jwt.secret, (err: string, payload: Payload) => {
      if (err) {
        reject(err)
      } else {
        resolve(payload)
      }
    })
  })
}
