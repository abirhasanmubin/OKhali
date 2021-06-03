export class Ride {
  constructor(
    public rideId: string,
    public rideFrom: string,
    public rideTo: string,
    public rider: string,
    public startTime: any,
    public endTime: any,
    public users: string[]
  ) { };
}
