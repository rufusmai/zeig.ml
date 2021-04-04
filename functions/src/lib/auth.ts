import { Request } from 'express'
import { Payload, verifyToken } from './auth/jwt'
import { checkPassword } from './auth/password'
import { UrlRoute } from './db'

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
