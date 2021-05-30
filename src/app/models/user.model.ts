export class User {
  constructor(
    public userId: string,
    public userFullName: string,
    public userEmail: string,
    public userContactNo: string,
    public isVehicleOwner: boolean,
    private _token: string,
    private _tokenExpired: Date,
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
}
