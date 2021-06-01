import { ITestingFacility } from './testing-facilities/TestingFacility';
import { IWaitTimes } from './wait-times/WaitTimes';
import { IFacility } from './Facility';

export class DhhsWebsiteTransformer {
  public async convert(testingFacilities: ITestingFacility[], waitTimes: IWaitTimes[]): Promise<IFacility[]> {
    const covidTestingFacilities: IFacility[] = [];

    for (const testingFacility of testingFacilities) {
      const { address, suburb, state, latitude, longitude } = testingFacility.location;
      const { id, site, type, details, ageLimit, phoneNumber, website, availability, requirements } = testingFacility;
      const waitTime = this.getWaitTime(testingFacility, waitTimes) || { time: 0 };

      const facility: IFacility = {
        id,
        site,
        type,
        details,
        ageLimit,
        location: {
          address,
          suburb,
          state,
          latitude,
          longitude,
        },
        phoneNumber,
        website,
        availability,
        requirements,
        waitTime: waitTime.time,
        waitTimeDetails: waitTime.details,
      };

      covidTestingFacilities.push(facility);
    }

    return covidTestingFacilities;
  }

  private getWaitTime(facility: ITestingFacility, waitTimes: IWaitTimes[]): IWaitTimes {
    const currentWaitTime: IWaitTimes | undefined = waitTimes.find((waitTime) => {
      return facility.id === waitTime.id;
    });

    if (currentWaitTime) {
      return currentWaitTime;
    }

    return {
      id: facility.id,
      time: undefined,
      details: 'No estimated wait time available',
    };
  }
}

export default DhhsWebsiteTransformer;
