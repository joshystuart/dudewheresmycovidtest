import { IRelativeTestingFacility, ITestingFacility, ITestingFacilityLocation } from '@dwmc-common/testing-facilities';
import { TestingFacility } from '@dwmc-common/database';
import { DistanceHelpers } from './DistanceHelpers';

export interface IUserLocationCoordinates {
  latitude: number;
  longitude: number;
}

export class CovidTestingLocationTransformer {
  constructor(private readonly distanceHelpers: DistanceHelpers) {}

  public convert(facilities: TestingFacility[], userCoordinates: IUserLocationCoordinates): IRelativeTestingFacility[] {
    const relativeFacilities: IRelativeTestingFacility[] = [];
    for (const facility of facilities) {
      const distance = this.distanceHelpers.calculateDistanceFromCoordinates(
        facility.get('latitude'),
        facility.get('longitude'),
        userCoordinates.latitude,
        userCoordinates.longitude,
      );
      const travelTime = this.distanceHelpers.getApproximateTravelTimeFromDistance(distance);

      const location: ITestingFacilityLocation = {
        address: facility.get('address'),
        suburb: facility.get('suburb'),
        state: facility.get('state'),
        latitude: facility.get('latitude'),
        longitude: facility.get('longitude'),
      };

      const testingFacility: ITestingFacility = {
        id: facility.get('id'),
        site: facility.get('site'),
        type: facility.get('type'),
        details: facility.get('details'),
        ageLimit: facility.get('ageLimit'),
        phoneNumber: facility.get('phoneNumber'),
        website: facility.get('website'),
        availability: facility.get('availability'),
        requirements: facility.get('requirements'),
        location,
        currentWaitTime: facility.get('currentWaitTime') || undefined,
        currentWaitTimeDescription: facility.get('currentWaitTimeDescription') || undefined,
        status: facility.get('status'),
      };

      relativeFacilities.push({
        facility: testingFacility,
        distance,
        travelTime,
      });
    }

    return relativeFacilities;
  }
}

export default CovidTestingLocationTransformer;
