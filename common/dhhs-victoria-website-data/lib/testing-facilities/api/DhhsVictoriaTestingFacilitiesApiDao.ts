import { ILogger } from '@rafterjs/logger-plugin';
import { ApiHelper } from '@rafterjs/utils';
import { INewTestingFacility } from '@dwmc-common/database';
import { IDhhsVictoriaWebsiteDataConfig } from '../../../config';
import { DhhsVictoriaTestingFacilitiesApiTransformer } from './DhhsVictoriaTestingFacilitiesApiTransformer';
import { IDhhsVictoriaTestingFacilitiesApiResponse } from './DhhsVictoriaTestingFacilitiesApi';

export class DhhsVictoriaTestingFacilitiesApiDao {
  constructor(
    private readonly config: IDhhsVictoriaWebsiteDataConfig,
    private readonly apiHelper: ApiHelper,
    private readonly dhhsVictoriaTestingFacilitiesApiTransformer: DhhsVictoriaTestingFacilitiesApiTransformer,
    private readonly logger: ILogger,
  ) {}

  public async getTestingFacilities(): Promise<INewTestingFacility[]> {
    const { apiEndpoint } = this.config.dhhsVictoria.data;
    this.logger.info(`Getting the latest covid testing facilities from ${apiEndpoint}`);
    const { data } = await this.apiHelper.get<IDhhsVictoriaTestingFacilitiesApiResponse>(apiEndpoint);

    return this.dhhsVictoriaTestingFacilitiesApiTransformer.convert(data);
  }
}

export default DhhsVictoriaTestingFacilitiesApiDao;
