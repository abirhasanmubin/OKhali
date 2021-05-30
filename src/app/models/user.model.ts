export class User {
  constructor(
    public userFullName: string,
    public userEmail: string,
    public userContactNo: string,
    public isVehicleOwner: boolean,
    private _token?: string,
    private _tokenExpired?: Date,
    public userId?: string,
    public userReview?: number,
    public userReviewedBy?: number,
    public vehicleId?: string,
  ) { }

  get token() {
    if (!this._tokenExpired || new Date() > this._tokenExpired) {
      return null;
    }
    return this._token;
  }
  set token(token: string) {
    this._token = token;
  }
  set tokenExpired(expiredDate: Date) {
    this._tokenExpired = expiredDate;
  }
}
