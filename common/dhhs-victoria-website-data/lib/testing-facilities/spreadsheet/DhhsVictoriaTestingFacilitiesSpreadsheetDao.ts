import { ILogger } from '@rafterjs/logger-plugin';
import { ApiHelper } from '@rafterjs/utils';
import { INewTestingFacility } from '@dwmc-common/database';
import { IDhhsVictoriaTestingFacilitiesSpreadsheet } from './DhhsVictoriaTestingFacilitiesSpreadsheet';
// eslint-disable-next-line max-len
import { DhhsVictoriaTestingFacilitiesSpreadsheetTransformer } from './DhhsVictoriaTestingFacilitiesSpreadsheetTransformer';
import { IDhhsVictoriaWebsiteDataConfig } from '../../../config';

export class DhhsVictoriaTestingFacilitiesSpreadsheetDao {
  constructor(
    private readonly config: IDhhsVictoriaWebsiteDataConfig,
    private readonly apiHelper: ApiHelper,
    // eslint-disable-next-line max-len
    private readonly dhhsVictoriaTestingFacilitiesSpreadsheetTransformer: DhhsVictoriaTestingFacilitiesSpreadsheetTransformer,
    private readonly logger: ILogger,
  ) {}

  public async getTestingFacilities(): Promise<INewTestingFacility[]> {
    const { testingFacilitiesUrl } = this.config.dhhsVictoria.data;
    this.logger.info(`Getting the latest covid testing facilities from ${testingFacilitiesUrl}`);
    const { data } = await this.apiHelper.get<IDhhsVictoriaTestingFacilitiesSpreadsheet>(testingFacilitiesUrl);

    return this.dhhsVictoriaTestingFacilitiesSpreadsheetTransformer.convert(data);
  }
}

export default DhhsVictoriaTestingFacilitiesSpreadsheetDao;
