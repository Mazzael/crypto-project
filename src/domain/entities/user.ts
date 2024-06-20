export class User {
  private _id: string
  private _userName: string
  private _email: string
  private _passwordHash: string

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

  changeUserName(newUserName: string) {
    this._userName = newUserName
  }

  changePassword(newPasswordHash: string) {
    this._passwordHash = newPasswordHash
  }
}
