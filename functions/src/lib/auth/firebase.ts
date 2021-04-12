import * as admin from 'firebase-admin'
import { auth } from 'firebase-admin/lib/auth'
import { NextFunction, Request, Response } from 'express'

let user: auth.DecodedIdToken

export const verifyIdToken = (alternative?: (req: Request, res: Response, next: NextFunction) => void) => {
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

export const getUser = (): auth.DecodedIdToken => user
