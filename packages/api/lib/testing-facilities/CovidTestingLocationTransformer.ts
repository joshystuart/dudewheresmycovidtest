import { IFacility } from './adapters/dhhs-website/Facility';
import { DistanceHelpers } from './DistanceHelpers';

export interface IUserLocationCoordinates {
  latitude: number;
  longitude: number;
}

export type ICovidTestingLocation = {
  facility: IFacility;
  distance: number;
  travelTime: number;
};

// TODO, maybe this should be moved to the client side and we work it all out there. Especially
//  since we're doing the sorting on the client side now for speed. It's not a heavy calculation.
//  It would mean we could start to cache some of the google spreadsheet data.
export class CovidTestingLocationTransformer {
  constructor(private readonly distanceHelpers: DistanceHelpers) {}

  public convert(facilities: IFacility[], userCoordinates: IUserLocationCoordinates): ICovidTestingLocation[] {
    return facilities.map((facility) => {
      const distance = this.distanceHelpers.calculateDistanceFromCoordinates(
        facility.location.latitude,
        facility.location.longitude,
        userCoordinates.latitude,
        userCoordinates.longitude,
      );

      const travelTime = this.distanceHelpers.getApproximateTravelTimeFromDistance(distance);

      return {
        facility,
        distance,
        travelTime,
      };
    });
  }
}

export default CovidTestingLocationTransformer;
