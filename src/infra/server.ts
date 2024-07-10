import { schedule } from 'node-cron'
import { env } from './env/env'
import { CronJob } from './routine/cron/cron-schedule'
import { app } from './app'
import EventDispatcher from '../core/event/event-dispatcher'
import { PrismaUsersRepository } from './database/prisma/repositories/prisma-users-repository'
import { PrismaService } from './database/prisma/prisma-service'

const eventDispatcher = new EventDispatcher()
const prismaUsersRepository = new PrismaUsersRepository(new PrismaService())
const cronJob = new CronJob(eventDispatcher, prismaUsersRepository)

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

      await cronJob.sendNotificationByCryptoPrices(cryptoIds, alerts)
    })
  })
