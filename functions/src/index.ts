import * as admin from 'firebase-admin'

import app from './urlShortener/app'
// import collector from './clearOutdatedUrls'

admin.initializeApp()

const urlShortener = app
// const clearOutdatedUrls = collector

export {
  urlShortener,
  // clearOutdatedUrls
}
