import * as admin from 'firebase-admin'
import { auth } from 'firebase-admin/lib/auth'
import { NextFunction, Request, RequestHandler, Response } from 'express'

let user: auth.DecodedIdToken

/**
 * Middleware that verifies if the request has an Authorization header containing a valid Bearer id token
 * The token must be a valid firebase auth id token.
 *
 * @param {RequestHandler} alternative alternative middleware that will be called if validation fails
 * @return {undefined}
 */
export const getVerifyIdTokenMiddleware = (alternative?: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const auth = req.headers.authorization

    if (auth) {
      try {
        user = await admin
            .auth()
            .verifyIdToken(auth.split(' ')[1])

        next()
        return
      } catch (error) {
        // continue regardless of error
      }
    }

    if (alternative) {
      alternative(req, res, next)
    } else {
      res.status(403).json({
        msg: 'Missing or invalid ID token!',
      }).end()
    }
  }
}

/**
 * gets previous the authenticated user if {@link verifyIdToken} middleware was used
 *
 * @return {auth.DecodedIdToken} id token
 */
export const getUser = (): auth.DecodedIdToken => user
