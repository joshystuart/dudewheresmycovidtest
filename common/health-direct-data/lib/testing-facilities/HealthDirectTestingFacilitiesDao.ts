import { ILogger } from '@rafterjs/logger-plugin';
import { ApiHelper } from '@rafterjs/utils';
import { INewTestingFacility } from '@dwmc-common/database';
import { IHealthDirectResponse } from './HealthDirect';
import { HealthDirectTestingFacilitiesTransformer } from './HealthDirectTestingFacilitiesTransformer';
import { IHealthDirectDataConfig } from '../../config';

export class HealthDirectTestingFacilitiesDao {
  constructor(
    private readonly config: IHealthDirectDataConfig,
    private readonly apiHelper: ApiHelper,
    private readonly healthDirectTestingFacilitiesTransformer: HealthDirectTestingFacilitiesTransformer,
    private readonly logger: ILogger,
  ) {}

  public async getTestingFacilities(): Promise<INewTestingFacility[]> {
    const { url, apiKey } = this.config.healthDirect.data.testingFacilities;
    this.logger.info(`Getting the latest covid testing facilities from ${url}`);

    const headers = {
      'x-api-key': apiKey,
    };

    const params = {
      'requestContext.serviceDeliveryMethod': 'PHYSICAL',
      'filter.programs.codes': 'nhsd%3A%2Freference%2Fcommon%2Fprogram%2Fcovid19',
    };

    const { data } = await this.apiHelper.get<IHealthDirectResponse>(url, { headers, params });

    return this.healthDirectTestingFacilitiesTransformer.convert(data);
  }
}

export default HealthDirectTestingFacilitiesDao;
