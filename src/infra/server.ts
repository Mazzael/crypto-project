import { schedule } from 'node-cron'
import { app } from './app'
import { env } from './env/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running!')

    schedule('* * * * *', async () => {
      console.log('teste')
    })
  })
