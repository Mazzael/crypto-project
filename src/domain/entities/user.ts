import { Alert } from './alert'

export class User {
  private _id: string
  private _userName: string
  private _email: string
  private _passwordHash: string
  private _favoriteCryptosId: string[] = []
  private _alerts: Alert[] = []

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

  get alerts() {
    return this._alerts
  }

  changeUserName(newUserName: string) {
    this._userName = newUserName
  }

  changePassword(newPasswordHash: string) {
    this._passwordHash = newPasswordHash
  }

  setAsFavoriteCrypto(cryptosId: string[]) {
    cryptosId.forEach((cryptoId) => {
      this._favoriteCryptosId.push(cryptoId)
    })
  }

  setAlert(alert: Alert) {
    this._alerts.push(alert)
  }
}
