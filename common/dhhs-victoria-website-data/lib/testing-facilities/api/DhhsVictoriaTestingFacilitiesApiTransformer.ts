import { INewTestingFacility, State, Status } from '@dwmc-common/database';
import { ILogger } from '@rafterjs/logger-plugin';

import { FacilityIdHelper } from '../../FacilityIdHelper';
import {
  IDhhsVictoriaTestingFacilitiesApiResponse,
  IDhhsVictoriaTestingFacility,
} from './DhhsVictoriaTestingFacilitiesApi';

export class DhhsVictoriaTestingFacilitiesApiTransformer {
  constructor(private readonly facilityIdHelper: FacilityIdHelper, private readonly logger: ILogger) {}

  public async convert(
    dhhsTestingFacilitiesResponse: IDhhsVictoriaTestingFacilitiesApiResponse,
  ): Promise<INewTestingFacility[]> {
    const testingFacilities: INewTestingFacility[] = [];

    for (const entry of dhhsTestingFacilitiesResponse.results) {
      this.logger.debug(`Mapping entry: ${entry.Site_Name}`);
      const site = this.getSiteName(entry);

      const facility: INewTestingFacility = {
        site,
        type: this.getFieldValue(entry.Facility),
        details: this.getFieldValue(entry.FacilityType),
        ageLimit: this.getFieldValue(entry.AgeLimit),
        address: this.getFieldValue(entry.Address),
        suburb: this.getSuburb(entry),
        state: this.getState(entry),
        latitude: Number(this.getFieldValue(entry.Latitude)),
        longitude: Number(this.getFieldValue(entry.Longitude)),
        phoneNumber: this.getFieldValue(entry.Phone),
        website: this.getFieldValue(entry.Website),
        availability: this.getFieldValue(entry.Service_Availability),
        requirements: this.getFieldValue(entry.Requirements),
        currentWaitTime: this.getCurrentWaitTime(this.getFieldValue(entry.Delay)),
        currentWaitTimeDescription: entry.DelayText,
        status: this.getStatus(
          this.getFieldValue(entry.Delay),
          this.getFieldValue(entry.DelayText),
          this.getFieldValue(entry.Status),
        ),
      };

      testingFacilities.push(facility);
    }

    return testingFacilities;
  }

  private getSiteName(entry: IDhhsVictoriaTestingFacility): string {
    return this.getFieldValue(entry.Site_Name);
  }

  private getSuburb(entry: IDhhsVictoriaTestingFacility): string {
    return this.getFieldValue(entry.Suburb);
  }

  private getState(entry: IDhhsVictoriaTestingFacility): State {
    const state = this.getFieldValue(entry.State).toUpperCase();

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

  private getStatus(delay: string, delayTest: string, status: string): Status {
    if (delay === '-1') {
      if (delayTest === 'Over capacity - no further accepted') {
        return Status.AT_CAPACITY;
      }

      return Status.TEMPORARILY_CLOSED;
    }

    if (status === 'Open') {
      return Status.OPEN;
    }

    return Status.CLOSED;
  }

  private getFieldValue(field: string | null): string {
    return field || '';
  }

  private getCurrentWaitTime(waitTime: string | undefined): number | undefined {
    if (waitTime !== '') {
      const time = Number(waitTime);
      if (time >= 0) {
        return time;
      }
    }

    return undefined;
  }
}

export default DhhsVictoriaTestingFacilitiesApiTransformer;
