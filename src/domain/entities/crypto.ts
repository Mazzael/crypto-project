export class Crypto {
  private _id: string
  private _name: string
  private _cryptoSymbol: string
  private _currentPrice: number

  constructor(
    id: string,
    name: string,
    cryptoSymbol: string,
    currentPrice: number,
  ) {
    this._id = id
    this._name = name
    this._cryptoSymbol = cryptoSymbol
    this._currentPrice = currentPrice
  }
}
