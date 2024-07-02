import { schedule } from 'node-cron'
import { env } from './env/env'
import { FastifyServer } from './http/server/fastify'
import { CronJob } from './routine/cron/cron-schedule'

const fastifyServer = new FastifyServer()

const cronJob = new CronJob()

fastifyServer.app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running!')

    schedule('* * * * *', async () => {
      const alerts = await cronJob.getAlerts()
      const alertsMap = new Map<string, Array<string>>()

      alerts.forEach((alert) => {
        if (alertsMap.get(alert.cryptoId)) {
          alertsMap.set(alert.cryptoId, [
            ...(alertsMap.get(alert.cryptoId) ?? []),
            alert.userId,
          ])
        } else {
          alertsMap.set(alert.cryptoId, [alert.userId])
        }
      })

      const iterator = alertsMap.keys()
      const cryptoIds = []

      for (const item of iterator) {
        cryptoIds.push(item)
      }

      cronJob.checkCryptoPrices(cryptoIds, alerts)
    })
  })
