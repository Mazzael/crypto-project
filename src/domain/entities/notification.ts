export class Notification {
  private _id: string
  private _userId: string
  private _content: string

  constructor(id: string, userId: string, content: string) {
    this._id = id
    this._userId = userId
    this._content = content
  }
}
