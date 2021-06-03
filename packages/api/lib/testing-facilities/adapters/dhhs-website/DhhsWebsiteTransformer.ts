import { ITestingFacility } from './testing-facilities/TestingFacility';
import { IFacility } from './Facility';

export class DhhsWebsiteTransformer {
  public async convert(testingFacilities: ITestingFacility[]): Promise<IFacility[]> {
    const covidTestingFacilities: IFacility[] = [];

    for (const testingFacility of testingFacilities) {
      const { address, suburb, state, latitude, longitude } = testingFacility.location;
      const {
        id,
        site,
        type,
        details,
        ageLimit,
        phoneNumber,
        website,
        availability,
        requirements,
        waitTime,
        waitTimeDetails,
      } = testingFacility;

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
        waitTime,
        waitTimeDetails,
      };

      covidTestingFacilities.push(facility);
    }

    return covidTestingFacilities;
  }
}

export default DhhsWebsiteTransformer;
