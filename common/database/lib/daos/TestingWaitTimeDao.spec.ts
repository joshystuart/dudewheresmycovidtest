import { ILogger } from '@rafterjs/logger-plugin';
import { stubInterface } from 'ts-sinon';
import { config } from '../../config/config';
import { Database } from '../Database';
import { TestingWaitTimeDao } from './TestingWaitTimeDao';

describe('TestingWaitTimeDao', () => {
  const logger: ILogger = stubInterface<ILogger>();
  let database: Database;
  let testingWaitTimeDao: TestingWaitTimeDao;

  beforeAll(async () => {
    database = new Database(await config(), logger);
    await database.connect();
    await database.sync();

    testingWaitTimeDao = new TestingWaitTimeDao(database, logger);
  });

  afterAll(async () => {
    if (database) {
      await database.disconnect();
    }
  });

  describe('create', () => {
    it('create new testing wait time', async () => {
      const testingWaitTime = await testingWaitTimeDao.create({ waitTime: 20, testingFacilityId: 44 });
      expect(testingWaitTime).toBeDefined();
      expect(testingWaitTime.createdAt).toBeDefined();
      expect(testingWaitTime.updatedAt).toBeDefined();
      expect(testingWaitTime.waitTime).toEqual(20);
      expect(testingWaitTime.testingFacilityId).toEqual(44);
    });
  });
});
