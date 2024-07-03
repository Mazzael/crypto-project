export class Alert {
  private _id: string
  private _userId: string
  private _cryptoId: string
  private _targetPrice: number
  private _isActive: boolean = true

  constructor(
    id: string,
    userId: string,
    cryptoId: string,
    targetPrice: number,
  ) {
    this._id = id
    this._userId = userId
    this._cryptoId = cryptoId
    this._targetPrice = targetPrice
  }

  get id() {
    return this._id
  }

  get userId() {
    return this._userId
  }

  get isActive() {
    return this._isActive
  }

  get cryptoId() {
    return this._cryptoId
  }

  get targetPrice() {
    return this._targetPrice
  }

  inactivate() {
    this._isActive = false
  }
}
