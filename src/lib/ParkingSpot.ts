import { Vehicle } from "./Vehicle"
import VehicleSize from "./VehicleSize"

class ParkingSpot{
  private _size: VehicleSize
  public isOccupied: boolean
  private _column: number

  public constructor(size: string, column: number) {
    this.isOccupied = false;
    this._size = VehicleSize[size as keyof typeof VehicleSize];
    this._column = column
  }

  public get size() {
    return this._size
  }

}

export default ParkingSpot