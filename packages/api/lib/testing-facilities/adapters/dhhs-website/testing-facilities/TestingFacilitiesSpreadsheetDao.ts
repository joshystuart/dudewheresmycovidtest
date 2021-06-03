import { ILogger } from '@rafterjs/logger-plugin';
import { ApiHelper } from '@rafterjs/utils';
import { ICovidAppConfig } from '../../../../../config/config';
import { ITestingFacilitiesSpreadsheet } from './TestingFacilitiesSpreadsheet';
import { TestingFacilitiesTransformer } from './TestingFacilitiesTransformer';
import { ITestingFacility } from './TestingFacility';

export class TestingFacilitiesSpreadsheetDao {
  constructor(
    private readonly config: ICovidAppConfig,
    private readonly apiHelper: ApiHelper,
    private readonly testingFacilitiesTransformer: TestingFacilitiesTransformer,
    private readonly logger: ILogger,
  ) {}

  public async getTestingFacilities(): Promise<ITestingFacility[]> {
    const { testingFacilitiesUrl } = this.config.covid.data.websites;
    this.logger.info(`Getting the latest covid testing facilities from ${testingFacilitiesUrl}`);
    const { data } = await this.apiHelper.get<ITestingFacilitiesSpreadsheet>(testingFacilitiesUrl);

    return this.testingFacilitiesTransformer.convert(data);
  }
}

export default TestingFacilitiesSpreadsheetDao;
