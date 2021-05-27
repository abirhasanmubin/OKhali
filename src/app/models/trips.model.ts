export class Trip {
  constructor(
    public tripId: string,
    public tripFrom: string,
    public tripTo: string,
    public tripDate: Date,
    public tripStatus: string,
    public userId: string,
  ) { }
}
