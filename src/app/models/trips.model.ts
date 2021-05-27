export class Trip {
  constructor(
    public tripFrom: string,
    public tripTo: string,
    public tripDate: Date,
    public tripStatus: string,
    public userId: string,
    public tripId?: string,
  ) { }
}
