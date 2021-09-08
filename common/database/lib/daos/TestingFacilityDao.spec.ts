import { ILogger } from '@rafterjs/logger-plugin';
import { stubInterface } from 'ts-sinon';
import { config } from '../../config/config';
import { Database } from '../Database';
import { TestingFacilityDao } from './TestingFacilityDao';

describe('TestingFacilityDao', () => {
  const logger: ILogger = stubInterface<ILogger>();
  let database: Database;
  let testingFacilityDao: TestingFacilityDao;

  beforeAll(async () => {
    database = new Database(await config(), logger);
    await database.connect();

    testingFacilityDao = new TestingFacilityDao(database, logger);
  });

  describe('findBySite', () => {
    it('find', async () => {
      const testingFacility = await testingFacilityDao.findBySite('NCN Health - Cobram Hospital - Appointment only');
      expect(testingFacility).toBeDefined();
    });
  });
});
