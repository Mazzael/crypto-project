import { User } from './user'

export class Alert {
  private _id: string
  private _user: User
  private _stockId: string
  private _targetPrice: number
  private _isActive: boolean = true

  constructor(id: string, user: User, stockId: string, targetPrice: number) {
    this._id = id
    this._user = user
    this._stockId = stockId
    this._targetPrice = targetPrice
  }

  get id() {
    return this._id
  }

  get userId() {
    return this._user.id
  }

  get isActive() {
    return this._isActive
  }

  inactivate() {
    this._isActive = false
  }
}
