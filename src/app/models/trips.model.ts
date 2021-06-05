import { Timestamp } from "rxjs/internal/operators/timestamp";

export class Trip {
  constructor(
    public tripFrom: string,
    public tripTo: string,
    public tripDate: any,
    public tripStatus: string,
    public userId?: string,
    public tripId?: string,
    public riderRequestList?: string[],
    public riderId?: string,
  ) { }
}
