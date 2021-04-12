import * as admin from 'firebase-admin'

import app from './urlShortener/app'
import scheduler from './clearOutdatedUrls'

admin.initializeApp()

const urlShortener = app
const clearOutdatedUrls = scheduler

export {
  urlShortener,
  clearOutdatedUrls,
}
