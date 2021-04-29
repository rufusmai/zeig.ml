import * as functions from 'firebase-functions'

import shortenUrl from './shortenUrl'
import getUrl from './getUrl'
import resolveUrl from './resolveUrl'
import { verifyPasswordMiddleware } from '../lib/auth/password'
import { getVerifyIdTokenMiddleware } from '../lib/auth/firebase'
import { validateSlugMiddleware } from '../lib/slug'

import express = require('express')
import cors = require('cors')

const app = express()
const corsMiddle = cors({ origin: true })

app.options('*', corsMiddle)

app.post('/url', corsMiddle, getVerifyIdTokenMiddleware(), shortenUrl)
app.get('/url/:slug', corsMiddle, validateSlugMiddleware, getVerifyIdTokenMiddleware(verifyPasswordMiddleware), getUrl)

app.get('/:slug', validateSlugMiddleware, resolveUrl)

export default functions.https.onRequest(app)
