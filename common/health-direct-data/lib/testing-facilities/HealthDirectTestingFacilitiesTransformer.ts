/* eslint-disable no-underscore-dangle */
import { ILogger } from '@rafterjs/logger-plugin';
import startCase from 'lodash/startCase';
import { INewTestingFacility, State } from '@dwmc-common/database';
import { IHealthDirectHealthCareService, IHealthDirectResponse } from './HealthDirect';
import { FacilityIdHelper } from '../FacilityIdHelper';

export class HealthDirectTestingFacilitiesTransformer {
  constructor(private readonly facilityIdHelper: FacilityIdHelper, private readonly logger: ILogger) {}

  public async convert(healthDirectResponse: IHealthDirectResponse): Promise<INewTestingFacility[]> {
    const testingFacilities: INewTestingFacility[] = [];

    for (const entry of healthDirectResponse._embedded.healthcareServices) {
      const site = this.getSiteName(entry);
      this.logger.debug(`Mapping entry: ${site}`);

      const { latitude, longitude } = entry.location.physicalLocation.geocode;

      const facility: INewTestingFacility = {
        site,
        type: '',
        details: entry.description,
        ageLimit: '',
        address: this.getAddress(entry),
        suburb: this.getSuburb(entry),
        state: this.getState(entry),
        latitude: Number(latitude),
        longitude: Number(longitude),
        phoneNumber: '',
        website: '',
        availability: '',
        requirements: '',
      };

      testingFacilities.push(facility);
    }

    return testingFacilities;
  }

  private getSiteName(entry: IHealthDirectHealthCareService): string {
    return entry.organisation.name;
  }

  private getAddress(entry: IHealthDirectHealthCareService): string {
    const { addressLine1, addressLine2, addressLine3 } = entry.location.physicalLocation;
    return [addressLine1, addressLine2, addressLine3].filter((address) => !!address).join(', ');
  }

  private getSuburb(entry: IHealthDirectHealthCareService): string {
    return startCase(entry.location.physicalLocation.suburb.label);
  }

  private getState(entry: IHealthDirectHealthCareService): State {
    const state = entry.location.physicalLocation.state.label;

    switch (state) {
      case State.ACT.toString():
        return State.ACT;
      case State.NSW.toString():
        return State.NSW;
      case State.NT.toString():
        return State.NT;
      case State.QLD.toString():
        return State.QLD;
      case State.SA.toString():
        return State.SA;
      case State.TAS.toString():
        return State.TAS;
      case State.VIC.toString():
        return State.VIC;
      case State.WA.toString():
      default:
        return State.WA;
    }
  }
}

export default HealthDirectTestingFacilitiesTransformer;
