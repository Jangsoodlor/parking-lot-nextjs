import ParkingSpot from "./ParkingSpot";
import { Vehicle } from "./Vehicle";
import VehicleSize from "./VehicleSize";

class ParkingLevel {
  private spots: ParkingSpot[]
  private level: number

  public constructor(level: number, nSpots: number) {
    this.level = level
    for(let i=0;i<nSpots;i++) {
      this.spots.push(new ParkingSpot(this.getParkingSpotSize(i), i));
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

  public parkVehicle(vehicle: Vehicle): boolean {
    let tempSpots = []
    for(let spot of this.spots) {
      if(!spot.isOccupied && vehicle.canFitInSpot(spot)) {
        tempSpots.push(spot)
      }
    }

    if(tempSpots.length < vehicle.spotsNeeded) {
      return false;
    }

    vehicle.park(tempSpots)
    return true;
  }

}

export default ParkingLevel