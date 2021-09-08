import { ILogger } from '@rafterjs/logger-plugin';
import { IRelativeTestingFacility } from '@dwmc-common/testing-facilities';
import { Database, TestingFacility, TestingFacilityDao } from '@dwmc-common/database';
import { CovidTestingLocationSorter } from './CovidTestingLocationSorter';
import { CovidTestingLocationTransformer } from './CovidTestingLocationTransformer';

export type ICovidTestingLocationsHandlerRequest = {
  latitude: number;
  longitude: number;
  state: string;
};

export class CovidTestingLocationsDao {
  constructor(
    private readonly database: Database,
    private readonly testingFacilityDao: TestingFacilityDao,
    private readonly covidTestingLocationTransformer: CovidTestingLocationTransformer,
    private readonly covidTestingLocationSorter: CovidTestingLocationSorter,
    private readonly logger: ILogger,
  ) {}

  public async getTestingFacilities(
    longitude: number,
    latitude: number,
    state: string,
  ): Promise<IRelativeTestingFacility[]> {
    this.logger.info(`Getting testing facilities for ${longitude}, ${latitude}, ${state}`);

    const data: TestingFacility[] = (await this.testingFacilityDao.findAllByState(state)) || [];

    this.logger.info(`Found ${data.length} testing sites`);

    const facilities = this.covidTestingLocationTransformer.convert(data, {
      longitude,
      latitude,
    });

    return this.covidTestingLocationSorter.sortByDistance(facilities);
  }
}

export default CovidTestingLocationsDao;
