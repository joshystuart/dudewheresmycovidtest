import { INewTestingFacility, INewTestingWaitTime, TestingFacility, TestingFacilityDao } from '@dwmc-common/database';
import { ILogger } from '@rafterjs/logger-plugin';

export type ITestingFacilityWaitTime = {
  testingFacility: TestingFacility;
  testingWaitTime?: INewTestingWaitTime;
};

export class TestingFacilityWaitTimeTransformer {
  constructor(private readonly testingFacilityDao: TestingFacilityDao, private readonly logger: ILogger) {}

  public async convert(facilities: INewTestingFacility[]): Promise<ITestingFacilityWaitTime[]> {
    const testingWaitTimes: ITestingFacilityWaitTime[] = [];

    for (const facility of facilities) {
      try {
        const testingFacility = await this.testingFacilityDao.findBySite(facility.site);

        if (testingFacility) {
          if (facility.currentWaitTime) {
            const testingWaitTime = {
              testingFacilityId: testingFacility.get('id'),
              waitTime: facility.currentWaitTime,
              waitTimeDescription: facility.currentWaitTimeDescription,
            };

            testingWaitTimes.push({
              testingFacility,
              testingWaitTime,
            });
          } else {
            testingWaitTimes.push({
              testingFacility,
            });
          }
        } else {
          this.logger.error(
            `WaitTimeSchemaTransformer::convert failed to find the testing site for ${facility.site}`,
            testingFacility,
          );
        }
      } catch (error) {
        this.logger.error(`WaitTimeSchemaTransformer::convert failed to convert the wait time ${facility.site}`, error);
      }
    }

    return testingWaitTimes;
  }
}

export default TestingFacilityWaitTimeTransformer;
