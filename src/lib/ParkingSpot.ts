import { Vehicle } from "./Vehicle"
import VehicleSize from "./VehicleSize"

class ParkingSpot{
  private _size: VehicleSize
  private vehicle: Vehicle | null
  private _spotNumber: number
  private _level: number

  public constructor(size: string, level: number, spotNumber: number) {
    this.vehicle = null;
    this._size = VehicleSize[size as keyof typeof VehicleSize];
    this._spotNumber = spotNumber
    this._level = level
  }

  public get size() {
    return this._size
  }

  public assignVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle
  }

  public freeSpot(): void{
    this.vehicle = null
  }

  public get isOccupied() {
    return this.vehicle !== null
  }

  public visualiseSpot(): string {
    if (this.vehicle instanceof Vehicle) {
      return this.vehicle.licensePlate
    }
    return "vacant"
  }
}

export default ParkingSpot