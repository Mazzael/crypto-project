import { schedule } from 'node-cron'
import { env } from './env/env'
import { CronJob } from './routine/cron/cron-schedule'
import { app } from './app'

const cronJob = new CronJob()

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running!')

    schedule('* * * * *', async () => {
      const alerts = await cronJob.getAlerts()
      const cryptoIds = cronJob.getCryptoIdsFromAlerts(alerts)

      cronJob.checkCryptoPrices(cryptoIds, alerts)
    })
  })
