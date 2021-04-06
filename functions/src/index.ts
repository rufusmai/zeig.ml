import * as admin from 'firebase-admin'

admin.initializeApp()

import urlShortener = require('./urlShortener/app')
import clearOutdatedUrls = require('./clearOutdatedUrls')

export {
  urlShortener,
  clearOutdatedUrls,
}
