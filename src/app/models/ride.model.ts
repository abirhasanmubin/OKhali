export class Ride {
  constructor(
    public rideFrom: string,
    public rideTo: string,
    public startTime: any,
    public endTime: any,
    public rideStatus: string,
    public riderId?: string,
    public tripList?: string[],
    public rideId?: string,
  ) { };
}
