export class Ride {
  constructor(
    public rideFrom: string,
    public rideTo: string,
    public startTime: any,
    public endTime: any,
    public rideStatus: string,
    public rider?: string,
    public trips?: string[],
    public rideId?: string,
  ) { };
}
