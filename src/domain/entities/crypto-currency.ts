export class CryptoCurrency {
  private _id: string
  private _name: string
  private _symbol: string
  private _currentPrice: number
  private _favoriteCryptosId: string[] = []

  constructor(id: string, name: string, symbol: string, currentPrice: number) {
    this._id = id
    this._name = name
    this._symbol = symbol
    this._currentPrice = currentPrice
  }

  setAsFavoriteCrypto(cryptosId: string[]) {
    cryptosId.forEach((cryptoId) => {
      this._favoriteCryptosId.push(cryptoId)
    })
  }
}
