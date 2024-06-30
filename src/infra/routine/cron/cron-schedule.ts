import { api } from '../../lib/axios'
import { RoutineInterface } from '../routine-interface'
import { schedule } from 'node-cron'

export abstract class CronSchedule implements RoutineInterface {
  async scheduleStockPrices(stockId: string): Promise<void> {
    schedule('* * * * *', async () => {
      try {
        const response = await api.get(
          `https://api.coingecko.com/api/v3/simple/price?x_cg_demo_api_key=CG-gtoEfBZHHupd4m2Mst5vKHa5&ids=${stockId}&vs_currencies=brl`,
        )
        return response.data
      } catch (error) {
        console.error(`Erro ao buscar preço da ação: ${error}`)
      }
    })
  }
}
