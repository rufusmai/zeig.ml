import { NextFunction, Request, Response } from 'express'
import { getUrlRoute, UrlRoute } from '../db'
import { checkAuthentication } from '../auth'

import bcrypt = require('bcrypt')

export const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> =>
  await bcrypt.compare(password, hashedPassword)

export const hashPassword = async (password: string): Promise<string> => await bcrypt.hash(password, 10)

export const verifyPassword = (req: Request, res: Response, next: NextFunction): void => {
  getUrlRoute(req.params.slug)
      .then(async (route: UrlRoute) => {
        if (route.password && !await checkAuthentication(req, route)) {
          res.status(403).json({
            msg: 'Missing or invalid Authorization!',
          }).end()
          return
        }

        next()
      })
      .catch(() => {
        res.status(404).json({
          msg: 'Url with that slug does not exist!',
        }).end()
      })
}
