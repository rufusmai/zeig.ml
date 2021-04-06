import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as moment from 'moment'
import { database } from 'firebase-admin/lib/database'
import DataSnapshot = database.DataSnapshot

export default functions.pubsub.schedule('every 1 day')
    .onRun(() => {
      const routes = admin
          .database()
          .ref('routes')

      routes
          .orderByChild('validUntil')
          .startAt(moment().unix())
          .get()
          .then((data: DataSnapshot) => {
            const updates: { [key: string]: null } = {}
            data.forEach((child) => {
              updates[<string> child.key] = null
              return false
            })

            console.log(`Removing ${Object.keys(updates).length} outdated routes...`)
            routes.update(updates)
            return false
          })
    })
