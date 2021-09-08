import { ILogger } from '@rafterjs/logger-plugin';
import { Database } from '@dwmc-common/database';
import { Callback, Context } from 'aws-lambda';
import { TestingFacilityWaitTimeDao } from './TestingFacilityWaitTimeDao';

// eslint-disable-next-line @typescript-eslint/ban-types
export type IDhhsVictoriaWebsiteDataEtlHandlerRequest = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type IDhhsVictoriaWebsiteDataEtlHandlerResponse = {};

export class WaitTimeCronHandler {
  constructor(
    private readonly database: Database,
    private readonly testingFacilityWaitTimeDao: TestingFacilityWaitTimeDao,
    private readonly logger: ILogger,
  ) {}

  public async handle(
    event: IDhhsVictoriaWebsiteDataEtlHandlerRequest,
    context: Context,
    next: Callback<IDhhsVictoriaWebsiteDataEtlHandlerResponse>,
  ): Promise<void> {
    this.logger.info(`Running the DHHS Website Data ETL handler.`);
    await this.database.connect();
    await this.database.sync();

    await this.testingFacilityWaitTimeDao.updateWaitTimes();

    await this.database.disconnect();
    next(null, {});
  }
}

export default WaitTimeCronHandler;
