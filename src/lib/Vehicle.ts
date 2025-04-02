import VehicleSize from "./VehicleSize";
import ParkingSpot from "./ParkingSpot";


abstract class Vehicle {
  protected _licensePlate: string;
  protected _spotsNeeded: number;
  protected _size: VehicleSize;
  protected spots: ParkingSpot[];

  public constructor(licensePlate: string) {
    this.spots = []
    this._licensePlate = licensePlate
  }

  public get licensePlate(): string {
    return this._licensePlate
  }

  public get spotsNeeded(): number {
    return this._spotsNeeded
  }

  public get size() {
    return this._size;
  }

  public canFit(spot: ParkingSpot): boolean {
    return false;
  }

  public exitParkingLot(): void {
    for(let spots of this.spots) {
      spots.freeSpot()
    }
    while(this.spots.length >= 0) {
      this.spots.pop()
    }
  }
}

class Motorcycle extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate);
    this._spotsNeeded = 1
    this._size = VehicleSize.Motorcycle
  }

  public canFit(spot: ParkingSpot): boolean {
    return true;
  }
}

class Car extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate);
    this._spotsNeeded = 1
    this._size = VehicleSize.Compact
  }

  public canFit(spot: ParkingSpot): boolean {
    return spot.size === this._size || spot.size === VehicleSize.Large
  }
}

class Bus extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate);
    this._spotsNeeded = 5
    this._size = VehicleSize.Large
  }

  public canFit(spot: ParkingSpot): boolean {
    return spot.size === this._size
  }
}

export { Vehicle, Motorcycle, Car, Bus };
