import ParkingLevel from "./ParkingLevel"
import { Vehicle } from "./Vehicle"
// todo: make singleton parkinglot

class ParkingLot {
  private levels: ParkingLevel[]

  public constructor(nLevels: number, spotsPerLevel: number) {
    for(let i=0;i<nLevels;i++) {
      this.levels.push(new ParkingLevel(i, spotsPerLevel))
    }
  }

  public assignParkingSpot(vehicle: Vehicle): boolean {
    for (let level of this.levels) {
      if(level.assignParkingSpot(vehicle)) {
        return true;
      }
    }
    return false;
  }

  public restoreParkingSpots(vehicles: Vehicle[]): void {
    
  }
}

export default ParkingLot