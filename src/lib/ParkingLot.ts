import ParkingLevel from "./ParkingLevel"
import { Vehicle } from "./Vehicle"

class ParkingLot {
  private levels: ParkingLevel[];
  private static instance: ParkingLot;
  private static readonly LEVELS = 3;
  private static readonly SPOTS_PER_LEVEL = 10;

  private constructor(nLevels: number, spotsPerLevel: number) {
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

  public static getInstance() {
    if(!ParkingLot.instance) {
      ParkingLot.instance = new ParkingLot(ParkingLot.LEVELS, ParkingLot.SPOTS_PER_LEVEL);
    }
    return ParkingLot.instance
  }
}

export default ParkingLot