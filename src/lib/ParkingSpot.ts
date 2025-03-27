import { Vehicle } from "./Vehicle"
import VehicleSize from "./VehicleSize"

class ParkingSpot{
  private _size: VehicleSize
  public isOccupied: boolean

  public constructor(level: number) {
    this.isOccupied = false;
  }

  public get size() {
    return this._size
  }

}

export default ParkingSpot