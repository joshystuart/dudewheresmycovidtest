import { ITestingFacilitiesSpreadsheet } from './TestingFacilitiesSpreadsheet';
import { ITestingFacility } from './TestingFacility';
import { FacilityIdHelper } from '../FacilityIdHelper';

export class TestingFacilitiesTransformer {
  constructor(private readonly facilityIdHelper: FacilityIdHelper) {}

  public async convert(testingFacilities: ITestingFacilitiesSpreadsheet): Promise<ITestingFacility[]> {
    const covidTestingDtos: ITestingFacility[] = [];

    for (const entry of testingFacilities.feed.entry) {
      const facility: ITestingFacility = {
        id: this.facilityIdHelper.createId(entry.gsx$sitename.$t, entry.gsx$facility.$t),
        site: entry.gsx$sitename.$t,
        type: entry.gsx$facility.$t,
        details: entry.gsx$sitefacilities.$t,
        ageLimit: entry.gsx$agelimit.$t,
        location: {
          address: entry.gsx$address.$t,
          suburb: entry.gsx$suburb.$t,
          state: entry.gsx$state.$t,
          latitude: Number(entry.gsx$latitude.$t),
          longitude: Number(entry.gsx$longitude.$t),
        },
        phoneNumber: entry.gsx$phone.$t,
        website: entry.gsx$website.$t,
        availability: entry.gsx$serviceavailability.$t,
        requirements: entry.gsx$requirements.$t,
      };

      covidTestingDtos.push(facility);
    }

    return covidTestingDtos;
  }
}

export default TestingFacilitiesTransformer;
