export abstract class RoutineInterface {
  abstract scheduleStockPrices(cryptoId: string): Promise<void>
}
