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
          let testingWaitTime: INewTestingWaitTime | undefined;

          if (facility.currentWaitTime) {
            testingWaitTime = {
              testingFacilityId: testingFacility.get('id'),
              waitTime: facility.currentWaitTime,
            };

            testingFacility.set('currentWaitTime', facility.currentWaitTime);
          } else {
            // set to null if there's no wait time
            testingFacility.set('currentWaitTime', null);
          }

          // update the description and status on all facilities
          testingFacility.set('currentWaitTimeDescription', facility.currentWaitTimeDescription);
          testingFacility.set('status', facility.status);

          testingWaitTimes.push({
            testingFacility,
            testingWaitTime,
          });
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
