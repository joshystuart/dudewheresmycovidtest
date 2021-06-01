import { ILogger } from '@rafterjs/logger-plugin';
import { ApiHelper } from '@rafterjs/utils';
import { ICovidAppConfig } from '../../../../../config/config';
import { IStatusListSpreadsheet } from './StatusListSpreadsheet';
import { StatusListTransformer } from './StatusListTransformer';
import { IStatusList } from './StatusList';

export class StatusListSpreadsheetDao {
  constructor(
    private readonly config: ICovidAppConfig,
    private readonly apiHelper: ApiHelper,
    private readonly statusListTransformer: StatusListTransformer,
    private readonly logger: ILogger,
  ) {}

  public async getTestingFacilityStatuses(): Promise<IStatusList[]> {
    const { statusListUrl } = this.config.covid.data.sources;
    this.logger.info(`Getting the latest status from ${statusListUrl}`);
    const { data } = await this.apiHelper.get<IStatusListSpreadsheet>(statusListUrl);

    return this.statusListTransformer.convert(data);
  }
}

export default StatusListSpreadsheetDao;
