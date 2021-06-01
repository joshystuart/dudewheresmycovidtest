import { ILogger } from '@rafterjs/logger-plugin';
import { Callback, Context } from 'aws-lambda';
import { CovidTestingLocationSorter } from './CovidTestingLocationSorter';
import { IFacility } from './adapters/dhhs-website/Facility';
import { DhhsWebsiteDao } from './adapters/dhhs-website/DhhsWebsiteDao';
import { CovidTestingLocationTransformer, ICovidTestingLocation } from './CovidTestingLocationTransformer';

export type ICovidTestingLocationsHandlerRequest = {
  latitude: number;
  longitude: number;
};

export type ICovidTestingLocationsHandlerResponse = {
  data: ICovidTestingLocation[];
};

export class CovidTestingLocationsHandler {
  constructor(
    private readonly dhhsWebsiteDao: DhhsWebsiteDao,
    private readonly covidTestingLocationTransformer: CovidTestingLocationTransformer,
    private readonly covidTestingLocationSorter: CovidTestingLocationSorter,
    private readonly logger: ILogger,
  ) {}

  public async handle(
    event: ICovidTestingLocationsHandlerRequest,
    context: Context,
    next: Callback<ICovidTestingLocationsHandlerResponse>,
  ): Promise<void> {
    const { latitude, longitude } = event;
    const data = await this.getTestingFacilities(longitude, latitude);

    next(null, {
      data,
    });
  }

  private async getTestingFacilities(longitude: number, latitude: number): Promise<ICovidTestingLocation[]> {
    this.logger.info(`Getting testing facilities for ${longitude}, ${latitude}`);

    const data: IFacility[] = await this.dhhsWebsiteDao.getFacilities();

    this.logger.info(`Found ${data.length} testing sites`);

    const facilities = this.covidTestingLocationTransformer.convert(data, {
      longitude,
      latitude,
    });

    return this.covidTestingLocationSorter.sortByDistance(facilities);
  }
}

export default CovidTestingLocationsHandler;
