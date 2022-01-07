import { INewTestingFacility, State, Status } from '@dwmc-common/database';
import { ILogger } from '@rafterjs/logger-plugin';
import { FacilityIdHelper } from '../../FacilityIdHelper';
import {
  IDhhsVictoriaTestingFacilitiesSpreadsheet,
  TestingFacilitiesSpreadsheetRow,
} from './DhhsVictoriaTestingFacilitiesSpreadsheet';

export class DhhsVictoriaTestingFacilitiesSpreadsheetTransformer {
  constructor(private readonly facilityIdHelper: FacilityIdHelper, private readonly logger: ILogger) {}

  public async convert(
    dhhsTestingFacilities: IDhhsVictoriaTestingFacilitiesSpreadsheet,
  ): Promise<INewTestingFacility[]> {
    const testingFacilities: INewTestingFacility[] = [];

    for (const entry of dhhsTestingFacilities.feed.entry) {
      this.logger.debug(`Mapping entry: ${entry.gsx$sitename?.$t}`);
      const site = this.getSiteName(entry);

      const facility: INewTestingFacility = {
        site,
        type: this.getFieldValue(entry.gsx$facility),
        details: this.getFieldValue(entry.gsx$sitefacilities),
        ageLimit: this.getFieldValue(entry.gsx$agelimit),
        address: this.getFieldValue(entry.gsx$address),
        suburb: this.getSuburb(entry),
        state: this.getState(entry),
        latitude: Number(this.getFieldValue(entry.gsx$latitude)),
        longitude: Number(this.getFieldValue(entry.gsx$longitude)),
        phoneNumber: this.getFieldValue(entry.gsx$phone),
        website: this.getFieldValue(entry.gsx$website),
        availability: this.getFieldValue(entry.gsx$serviceavailability),
        requirements: this.getFieldValue(entry.gsx$requirements),
        currentWaitTime: this.getCurrentWaitTime(this.getFieldValue(entry.gsx$delay)),
        currentWaitTimeDescription: this.getFieldValue(entry.gsx$delaytext),
        status: Status.OPEN,
      };

      testingFacilities.push(facility);
    }

    return testingFacilities;
  }

  private getSiteName(entry: TestingFacilitiesSpreadsheetRow): string {
    let sitename = this.getFieldValue(entry.gsx$sitename);
    if (sitename === '') {
      sitename = this.getFieldValue(entry['gsx$sitenamewingateavenuecommunitycentre-cohealth']);
    }
    return sitename;
  }

  private getSuburb(entry: TestingFacilitiesSpreadsheetRow): string {
    let suburb = this.getFieldValue(entry.gsx$suburb);
    if (suburb === '') {
      suburb = this.getFieldValue(entry.gsx$suburbascotvale);
    }
    return suburb;
  }

  private getState(entry: TestingFacilitiesSpreadsheetRow): State {
    let state = this.getFieldValue(entry.gsx$state);
    if (state === '') {
      state = this.getFieldValue(entry.gsx$statevic);
    }

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

  private getFieldValue(field: undefined | { $t: string }): string {
    if (field && field.$t) {
      return field.$t;
    }

    return '';
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

export default DhhsVictoriaTestingFacilitiesSpreadsheetTransformer;
