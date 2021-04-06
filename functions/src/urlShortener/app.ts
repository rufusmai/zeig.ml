import * as functions from 'firebase-functions'

import shortenUrl from './shortenUrl'
import getUrl from './getUrl'
import resolveUrl from './resolveUrl'
import { verifyPassword } from '../lib/auth/password'

import express = require('express')
import cors = require('cors')

const app = express()
const corsMiddle = cors({ origin: true })

app.options('*', corsMiddle)

app.post('/url', corsMiddle, shortenUrl)
app.get('/url/:slug', corsMiddle, verifyPassword, getUrl)

app.get('/:slug', resolveUrl)

export default functions.https.onRequest(app)
