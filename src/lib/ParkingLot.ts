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
    if(this.vehicles[vehicle.licensePlate] !== undefined) {
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

  public removeVehcile(licensePlate: string): {} {
    if(this.vehicles[licensePlate] === undefined) {
      return {"notice" : "The car is not in the parking lot!"}
    }
    this.vehicles[licensePlate].exitParkingLot()
    return {"notice" : "Vehicle exits successfully."}
  }

  public static getInstance() {
    if(!ParkingLot.instance) {
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