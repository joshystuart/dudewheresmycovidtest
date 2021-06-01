import { ILogger } from '@rafterjs/logger-plugin';
import { WaitTimesSpreadsheetDao } from './wait-times/WaitTimesSpreadsheetDao';
import { TestingFacilitiesSpreadsheetDao } from './testing-facilities/TestingFacilitiesSpreadsheetDao';
import { DhhsWebsiteTransformer } from './DhhsWebsiteTransformer';
import { IFacility } from './Facility';

export class DhhsWebsiteDao {
  constructor(
    private readonly testingFacilitiesSpreadsheetDao: TestingFacilitiesSpreadsheetDao,
    private readonly waitTimesSpreadsheetDao: WaitTimesSpreadsheetDao,
    private readonly dhhsWebsiteTransformer: DhhsWebsiteTransformer,
    private readonly logger: ILogger,
  ) {}

  public async getFacilities(): Promise<IFacility[]> {
    this.logger.info(`Getting all the covid testing facilities data`);

    const [testingFacilities, waitTimes] = await Promise.all([
      this.testingFacilitiesSpreadsheetDao.getTestingFacilities(),
      this.waitTimesSpreadsheetDao.getTestingFacilityWaitTimes(),
    ]);

    this.logger.info(`Found ${testingFacilities.length} testing facilities`);
    this.logger.info(`Found ${waitTimes.length} testing facilities with defined wait times`);

    return this.dhhsWebsiteTransformer.convert(testingFacilities, waitTimes);
  }
}

export default DhhsWebsiteDao;
