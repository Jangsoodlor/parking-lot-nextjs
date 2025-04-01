import { Vehicle } from "./Vehicle"
import VehicleSize from "./VehicleSize"

class ParkingSpot{
  private _size: VehicleSize
  public isOccupied: boolean
  private _spotNumber: number
  private _level: number

  public constructor(size: string, level: number, spotNumber: number) {
    this.isOccupied = false;
    this._size = VehicleSize[size as keyof typeof VehicleSize];
    this._spotNumber = spotNumber
    this._level = level
  }

  public get size() {
    return this._size
  }

}

export default ParkingSpot