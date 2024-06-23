export class User {
  private _id: string
  private _userName: string
  private _email: string
  private _passwordHash: string
  private _favoriteStocksId: string[] = []

  constructor(
    id: string,
    userName: string,
    email: string,
    passwordHash: string,
  ) {
    this._id = id
    this._userName = userName
    this._email = email
    this._passwordHash = passwordHash
  }

  get id() {
    return this._id
  }

  get passwordHash() {
    return this._passwordHash
  }

  get email() {
    return this._email
  }

  get userName() {
    return this._userName
  }

  changeUserName(newUserName: string) {
    this._userName = newUserName
  }

  changePassword(newPasswordHash: string) {
    this._passwordHash = newPasswordHash
  }

  setAsFavoriteStock(stocksId: string[]) {
    stocksId.forEach((stockId) => {
      this._favoriteStocksId.push(stockId)
    })
  }
}
