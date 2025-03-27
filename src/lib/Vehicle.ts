import VehicleSize from "./VehicleSize";
import ParkingSpot from "./ParkingSpot";


abstract class Vehicle {
  protected licensePlate: string;
  public spotsNeeded: number;
  protected _size: VehicleSize;
  protected spots: ParkingSpot[];

  public constructor(licensePlate: string) {
    this.spots = []
    this.licensePlate = licensePlate
  }

  public park(spots: ParkingSpot[]): void {
    for(let spot of spots) {
      spot.isOccupied = true
      this.spots.push(spot);
    }
  }

  public unpark(): void {
    for(let spot of this.spots) {
      spot.isOccupied = false;
    }

    while(this.spots.length > 0) {
      this.spots.pop()
    }
  }

  public get size() {
    return this._size;
  }

  public canFitInSpot(spot: ParkingSpot): boolean {
    return false;
  }

}

class Motorcycle extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate);
    this.spotsNeeded = 1
    this._size = VehicleSize.Motorcycle
  }

  public canParkInSpot(spot: ParkingSpot): boolean {
    return true;
  }
}

class Car extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate);
    this.spotsNeeded = 1
    this._size = VehicleSize.Compact
  }

  public canParkInSpot(spot: ParkingSpot): boolean {
    return spot.size === this._size || spot.size === VehicleSize.Large
  }
}

class Bus extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate);
    this.spotsNeeded = 5
    this._size = VehicleSize.Large
  }

  public canParkInSpot(spot: ParkingSpot): boolean {
    return spot.size === this._size
  }
}

export { Vehicle, Motorcycle, Car, Bus };
