import { ILogger } from '@rafterjs/logger-plugin';
import { TestingFacilitiesSpreadsheetDao } from './testing-facilities/TestingFacilitiesSpreadsheetDao';
import { DhhsWebsiteTransformer } from './DhhsWebsiteTransformer';
import { IFacility } from './Facility';

export class DhhsWebsiteDao {
  constructor(
    private readonly testingFacilitiesSpreadsheetDao: TestingFacilitiesSpreadsheetDao,
    private readonly dhhsWebsiteTransformer: DhhsWebsiteTransformer,
    private readonly logger: ILogger,
  ) {}

  public async getFacilities(): Promise<IFacility[]> {
    this.logger.info(`Getting all the covid testing facilities data`);

    const testingFacilities = await this.testingFacilitiesSpreadsheetDao.getTestingFacilities();

    this.logger.info(`Found ${testingFacilities.length} testing facilities`);

    return this.dhhsWebsiteTransformer.convert(testingFacilities);
  }
}

export default DhhsWebsiteDao;
