import ParkingLevel from "./ParkingLevel"
import { Vehicle } from "./Vehicle"

class ParkingLot {
  private levels: ParkingLevel[]

  public constructor(nLevels: number, spotsPerLevel: number) {
    for(let i=0;i<nLevels;i++) {
      this.levels.push(new ParkingLevel(i, spotsPerLevel))
    }
  }

  public parkVehicle(vehicle: Vehicle): boolean {
    for (let level of this.levels) {
      if(level.parkVehicle(vehicle)) {
        return true;
      }
    }
    return false;
  }
}