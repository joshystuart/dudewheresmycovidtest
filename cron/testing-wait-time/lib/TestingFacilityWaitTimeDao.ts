import { ILogger } from '@rafterjs/logger-plugin';
import {
  INewTestingWaitTime,
  ITestingFacility,
  TestingFacility,
  TestingFacilityDao,
  TestingWaitTimeDao,
} from '@dwmc-common/database';
import { DhhsVictoriaTestingFacilitiesApiDao } from '@dwmc-common/dhhs-victoria-website-data';
import { TestingFacilityWaitTimeTransformer } from './TestingFacilityWaitTimeTransformer';

export class TestingFacilityWaitTimeDao {
  constructor(
    private readonly dhhsVictoriaTestingFacilitiesApiDao: DhhsVictoriaTestingFacilitiesApiDao,
    private readonly testingFacilityWaitTimeTransformer: TestingFacilityWaitTimeTransformer,
    private readonly testingWaitTimeDao: TestingWaitTimeDao,
    private readonly testingFacilityDao: TestingFacilityDao,
    private readonly logger: ILogger,
  ) {}

  public async updateWaitTimes(): Promise<void> {
    const facilities = await this.dhhsVictoriaTestingFacilitiesApiDao.getTestingFacilities();
    this.logger.info(`Found ${facilities.length} facilities`);

    this.logger.info(`Found ${facilities.length} facilities with wait times`);

    const testingFacilityWaitTimes = await this.testingFacilityWaitTimeTransformer.convert(facilities);

    if (testingFacilityWaitTimes.length > 0) {
      for (const { testingFacility, testingWaitTime } of testingFacilityWaitTimes) {
        try {
          if (testingWaitTime) {
            this.logger.info(
              `Creating a new wait time entry for ${testingFacility.get('site')} with a time of ${
                testingWaitTime.waitTime
              }`,
            );

            await this.createTestingWaitTime(testingWaitTime);
          }

          await this.updateTestingFacilityCurrentWaitTime(testingFacility, testingWaitTime);
        } catch (error) {
          this.logger.error(`Failed to create the item`, testingFacilityWaitTimes, error);
        }
      }
    }
  }

  private async updateTestingFacilityCurrentWaitTime(
    testingFacility: TestingFacility,
    testingWaitTime?: INewTestingWaitTime,
  ): Promise<void> {
    const currentWaitTime = testingWaitTime ? testingWaitTime.waitTime : null;
    testingFacility.set('currentWaitTime', currentWaitTime);
    // await TestingFacility.update({ currentWaitTime }, { where: { id: testingFacility.get('id') } });

    await this.testingFacilityDao.update(testingFacility.toJSON() as ITestingFacility);
  }

  private async createTestingWaitTime(testingWaitTime: INewTestingWaitTime): Promise<void> {
    await this.testingWaitTimeDao.create(testingWaitTime);
  }
}

export default TestingFacilityWaitTimeDao;
