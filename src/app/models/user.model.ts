export class User {
  constructor(
    public userFullName: string,
    public userEmail: string,
    public userContactNo: string,
    public isVehicleOwner: boolean,
    public userId?: string,
    public userReview?: number,
    public userReviewedBy?: number,
    public vehicleId?: string,
  ) { }
}
