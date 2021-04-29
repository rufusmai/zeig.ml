import { NextFunction, Request, Response } from 'express'
import { getUrlRoute, UrlRoute } from '../db'
import { checkAuthentication } from '../auth'

import bcrypt = require('bcrypt')

/**
 * Checks if the given password matches the password hash
 *
 * @param {string} password
 * @param {string} hashedPassword
 * @return {Promise<boolean>} true if passwords are equal
 */
export const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> =>
  await bcrypt.compare(password, hashedPassword)

/**
 * Hashed the given value and returns it
 *
 * @param {string} password
 * @return {Promise<string>} hashed password
 */
export const hashPassword = async (password: string): Promise<string> => await bcrypt.hash(password, 10)

/**
 * Middleware that checks if a password is given in a Authorization header using Basic authorization (user:password).
 * The user part is ignored. The password is checked against the database for the given slug.
 * The slug is taken from an url param called "slug"
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const verifyPasswordMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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
