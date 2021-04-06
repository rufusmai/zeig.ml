import { NextFunction, Request, Response } from 'express'
import { getUrlRoute, UrlRoute } from '../db'
import { checkAuthentication } from '../auth'

import bcrypt = require('bcrypt')

export const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> =>
  await bcrypt.compare(password, hashedPassword)

export const hashPassword = async (password: string): Promise<string> => await bcrypt.hash(password, 10)

export const verifyPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const route: UrlRoute | undefined = await getUrlRoute(req.params.slug)

  if (!route) {
    res.status(404).json({
      msg: 'Url with that slug does not exist!',
    })
    return
  }

  if (route.password && !await checkAuthentication(req, route)) {
    res.status(401).json({
      msg: 'Missing or invalid Authorization!',
    })
    return
  }

  next()
}
