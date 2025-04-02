import VehicleSize from "./VehicleSize"
import {Car, Motorcycle, Bus, Vehicle} from "./Vehicle"


class VehicleFactory {
  private static vehicles: { [licensePlate: string]: Vehicle } = {}

  public static getVehicle(licensePlate: string, size: string): Vehicle {
    if(this.vehicles[licensePlate] === undefined) {
      if (size===VehicleSize.Compact) {
        return new Car(licensePlate)
      } else if (size === VehicleSize.Large) {
        return new Bus(licensePlate)
      }
      return new Motorcycle(licensePlate)
    }
    return this.vehicles[licensePlate]
  }

}

export default VehicleFactory