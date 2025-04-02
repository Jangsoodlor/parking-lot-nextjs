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

  public get size() {
    return this._size;
  }

  public canFit(spot: ParkingSpot): boolean {
    return false;
  }

  public static getVehicle(licensePlate: string, size: string): Vehicle {
    if (size===VehicleSize.Compact) {
      return new Car(licensePlate)
    } else if (size === VehicleSize.Large) {
      return new Bus(licensePlate)
    }
    return new Motorcycle(licensePlate)
  }

}

class Motorcycle extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate);
    this.spotsNeeded = 1
    this._size = VehicleSize.Motorcycle
  }

  public canFit(spot: ParkingSpot): boolean {
    return true;
  }
}

class Car extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate);
    this.spotsNeeded = 1
    this._size = VehicleSize.Compact
  }

  public canFit(spot: ParkingSpot): boolean {
    return spot.size === this._size || spot.size === VehicleSize.Large
  }
}

class Bus extends Vehicle {
  public constructor(licensePlate: string) {
    super(licensePlate);
    this.spotsNeeded = 5
    this._size = VehicleSize.Large
  }

  public canFit(spot: ParkingSpot): boolean {
    return spot.size === this._size
  }
}

export { Vehicle, Motorcycle, Car, Bus };
