import ParkingLot from "./ParkingLot";
import ParkingSpot from "./ParkingSpot";
import { Vehicle } from "./Vehicle";
import VehicleSize from "./VehicleSize";

class ParkingLevel {
  private spots: ParkingSpot[]
  private _level: number

  public constructor(level: number, nSpots: number) {
    this._level = level
    this.spots = []
    for(let i=0;i<nSpots;i++) {
      this.spots.push(new ParkingSpot(this.getParkingSpotSize(i), level, i));
    }
  }

  private getParkingSpotSize(i: number) {
    if(i<5) {
      return VehicleSize.Large
    }
    if(i%3 === 0) {
      return VehicleSize.Motorcycle
    }
    return VehicleSize.Compact;
  }

  private allocateSpots(vehicle: Vehicle): ParkingSpot[] | null {
    const tempSpots: ParkingSpot[][] = []
    let tempTempSpots: ParkingSpot[] = []
    for(let spot of this.spots) {
      if(vehicle.canFit(spot) && !spot.isOccupied) {
        tempTempSpots.push(spot);
        console.log("Push")
        if(tempTempSpots.length >= vehicle.spotsNeeded) {
          tempSpots.push([...tempTempSpots])
          tempTempSpots = []
        }
      }
      else {
        console.log("Dame")
        tempTempSpots = []
      }
    }
  if(tempSpots.length === 0) {
    return null;
  }

  tempSpots.sort((a, b) => a.length - b.length)
  return tempSpots[0];
  }

  public assignSpots(vehicle: Vehicle): boolean {
    console.log(this._level)
    const spots = this.allocateSpots(vehicle)
    console.log(spots)
    if(!spots) {
      return false
    }
    for (let spot of spots) {
      spot.assign(vehicle)
    }
    return true;
  }

}

export default ParkingLevel