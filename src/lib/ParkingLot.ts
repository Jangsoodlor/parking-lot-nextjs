import ParkingLevel from "./ParkingLevel"
import { Vehicle } from "./Vehicle"

class ParkingLot {
  private levels: ParkingLevel[];
  private static instance: ParkingLot;
  private static readonly LEVELS = 3;
  private static readonly SPOTS_PER_LEVEL = 10;
  private vehicles: { [licensePlate: string]: Vehicle } = {}

  private constructor(nLevels: number, spotsPerLevel: number) {
    this.levels = []
    for(let i=0;i<nLevels;i++) {
      this.levels.push(new ParkingLevel(i, spotsPerLevel))
    }
  }

  public assignParkingSpot(vehicle: Vehicle): string {
    if(this.vehicles[vehicle.licensePlate] instanceof Vehicle) {
      return "The vehicle is already parked!"
    }

    for (let level of this.levels) {
      if(level.assignSpots(vehicle)) {
        this.vehicles[vehicle.licensePlate] = vehicle
        return "Vehicle parked successfully."
      }
    }
    return "Parking lot is Full."
  }

  public removeVehcile(licensePlate: string): string{
    if (this.vehicles[licensePlate] instanceof Vehicle) {
      this.vehicles[licensePlate].exitParkingLot()
      delete this.vehicles[licensePlate]
      return "Vehicle exits successfully"
    }
    return "The car is not in the parking lot!"
  }

  public static getInstance() {
    if(!ParkingLot.instance) {
      console.log("U")
      ParkingLot.instance = new ParkingLot(ParkingLot.LEVELS, ParkingLot.SPOTS_PER_LEVEL);
    }
    return ParkingLot.instance
  }

  public visualiseSpots() {
    let temp = []
    for(let level of this.levels) {
      temp.push(level.visualiseSpots())
    }
    return temp
  }
}

export default ParkingLot
