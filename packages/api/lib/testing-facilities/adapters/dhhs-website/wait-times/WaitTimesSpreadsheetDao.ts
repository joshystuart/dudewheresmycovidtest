import { ILogger } from '@rafterjs/logger-plugin';
import { ApiHelper } from '@rafterjs/utils';
import { ICovidAppConfig } from '../../../../../config/config';
import { IWaitTimesSpreadsheet } from './WaitTimesSpreadsheet';
import { WaitTimesTransformer } from './WaitTimesTransformer';
import { IWaitTimes } from './WaitTimes';

export class WaitTimesSpreadsheetDao {
  constructor(
    private readonly config: ICovidAppConfig,
    private readonly apiHelper: ApiHelper,
    private readonly waitTimesTransformer: WaitTimesTransformer,
    private readonly logger: ILogger,
  ) {}

  public async getTestingFacilityWaitTimes(): Promise<IWaitTimes[]> {
    const { waitTimesUrl } = this.config.covid.data.sources;
    this.logger.info(`Getting the latest wait times from ${waitTimesUrl}`);
    const { data } = await this.apiHelper.get<IWaitTimesSpreadsheet>(waitTimesUrl);

    return this.waitTimesTransformer.convert(data);
  }
}

export default WaitTimesSpreadsheetDao;
