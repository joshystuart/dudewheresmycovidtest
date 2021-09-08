import { ILogger } from '@rafterjs/logger-plugin';
import { Database } from '../Database';
import { INewTestingWaitTime, TestingWaitTime } from '../models/TestingWaitTime';

export class TestingWaitTimeDao {
  constructor(private readonly database: Database, private readonly logger: ILogger) {}

  public async create(testingWaitTime: INewTestingWaitTime): Promise<TestingWaitTime> {
    const transaction = await TestingWaitTime.sequelize?.transaction();

    try {
      this.logger.info(`Creating a test wait time for the facility id: ${testingWaitTime.testingFacilityId}`);
      if (!testingWaitTime.testingFacilityId) {
        throw new Error(`Please set the testing facility id`);
      }

      const savedTestWaitTime = await TestingWaitTime.create(testingWaitTime, {
        transaction,
      });

      await transaction?.commit();

      this.logger.debug(`Successfully created new test wait time`, savedTestWaitTime.toJSON());
      return savedTestWaitTime;
    } catch (error) {
      this.logger.error(`Failed to create new test wait time`, error);
      await transaction?.rollback();
      throw error;
    }
  }
}

export default TestingWaitTimeDao;
