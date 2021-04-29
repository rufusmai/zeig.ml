import { Request } from 'express'
import { UrlRoute } from './db'
import { Payload, verifyToken } from './auth/jwt'
import { checkPassword } from './auth/password'

/**
 * Checks if a valid authentication method was used to access a given password protected {@link UrlRoute}
 * One of the following criteria must be fulfilled:
 *  - The request provides a valid JWT token that acts like a one-time password
 *    (either as Bearer Token or provided as query string parameter)
 *  - The request provides the {@link UrlRoute} password using Basic Authentication
 *
 * @param {Request} req express request
 * @param {UrlRoute} route password protected url route
 */
export const checkAuthentication = async (req: Request, route: UrlRoute): Promise<boolean> => {
  const tokenVerifier = ({ slug }: Payload): boolean => req.params.slug === slug
  const errorHandler = () => false

  if (req.headers.authorization) {
    const authorization = req.headers.authorization?.split(' ')
    const authType = authorization[0]
    const authData = authorization[1]

    if (authType === 'Bearer') {
      return await verifyToken(authData)
          .then(tokenVerifier)
          .catch(errorHandler)
    } else if (authType === 'Basic') {
      const data = Buffer.from(authorization[1], 'base64').toString('ascii')
      const password = data.split(':')[1]

      return checkPassword(password, <string> route.password)
    }
  } else if (req.query.token) {
    return await verifyToken(<string> req.query.token)
        .then(tokenVerifier)
        .catch(errorHandler)
  }

  return false
}
