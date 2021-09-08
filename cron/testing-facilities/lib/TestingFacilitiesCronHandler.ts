import { ILogger } from '@rafterjs/logger-plugin';
import { Database } from '@dwmc-common/database';
import { Callback, Context } from 'aws-lambda';
import { UpdateTestingFacilitiesDao } from './UpdateTestingFacilitiesDao';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ITestingFacilitiesCronHandlerRequest = {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ITestingFacilitiesCronHandlerResponse = {};

export class TestingFacilitiesCronHandler {
  constructor(
    private readonly database: Database,
    private readonly updateTestingFacilitiesDao: UpdateTestingFacilitiesDao,
    private readonly logger: ILogger,
  ) {}

  public async handle(
    event: ITestingFacilitiesCronHandlerRequest,
    context: Context,
    next: Callback<ITestingFacilitiesCronHandlerResponse>,
  ): Promise<void> {
    this.logger.info(`Running the DHHS Website Data ETL handler.`);
    await this.database.connect();
    await this.database.sync();

    await this.updateTestingFacilitiesDao.update();

    await this.database.disconnect();
    next(null, {});
  }
}

export default TestingFacilitiesCronHandler;
