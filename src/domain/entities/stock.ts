export class Stock {
  private _id: string
  private _name: string
  private _stockSymbol: string
  private _currentPrice: number

  constructor(
    id: string,
    name: string,
    stockSymbol: string,
    currentPrice: number,
  ) {
    this._id = id
    this._name = name
    this._stockSymbol = stockSymbol
    this._currentPrice = currentPrice
  }
}
