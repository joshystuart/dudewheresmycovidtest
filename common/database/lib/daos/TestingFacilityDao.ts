import { ILogger } from '@rafterjs/logger-plugin';
import { Database } from '../Database';
import { INewTestingFacility, ITestingFacility, State, TestingFacility } from '../models/TestingFacility';

export class TestingFacilityDao {
  constructor(private readonly database: Database, private readonly logger: ILogger) {}

  public async create(testingFacility: INewTestingFacility): Promise<TestingFacility> {
    const transaction = await TestingFacility.sequelize?.transaction();

    try {
      this.logger.info(`Creating new testing facility model ${testingFacility.site}`);
      this.logger.debug(`Creating new testing facility model with:`, testingFacility);

      const savedTestingFacilityModel = await TestingFacility.create(testingFacility, {
        transaction,
        include: [],
      });

      await transaction?.commit();

      this.logger.debug(`Successfully created new testing facility`, savedTestingFacilityModel.toJSON());
      return savedTestingFacilityModel;
    } catch (error) {
      this.logger.error(`Failed to create new testing facility`, error);
      await transaction?.rollback();
      throw error;
    }
  }

  public async update(testingFacility: ITestingFacility): Promise<TestingFacility> {
    this.logger.info(`Updating testing facility model ${testingFacility.site}`);
    this.logger.debug(`Updating new testing facility model with:`, testingFacility);

    const transaction = await TestingFacility.sequelize?.transaction();

    try {
      this.logger.info(`Updating testing facility model ${testingFacility.site}`);
      this.logger.debug(`Updating testing facility model with:`, testingFacility);

      const updatedTestingFacilityModel = TestingFacility.build(testingFacility, {
        isNewRecord: false,
        include: [],
      });

      await updatedTestingFacilityModel.save();

      await transaction?.commit();

      this.logger.info(`Successfully updated the testing facility model ${testingFacility.site}`);
      this.logger.debug(`Updated testing facility model with:`, testingFacility);

      return updatedTestingFacilityModel;
    } catch (error) {
      this.logger.error(`Failed to create new testing facility`, error);
      await transaction?.rollback();
      throw error;
    }
  }

  public async upsert(testingFacility: INewTestingFacility | ITestingFacility): Promise<TestingFacility> {
    // using the site as an indicator... there's probably something better...?
    const foundTestingFacilityModel = await this.findBySite(testingFacility.site);

    if (foundTestingFacilityModel && foundTestingFacilityModel.get('id')) {
      // should probably do something a little less crude
      return this.update({
        ...testingFacility,
        id: foundTestingFacilityModel.get('id'),
      });
    }

    // do create
    return this.create(testingFacility);
  }

  public async findById(id: string): Promise<TestingFacility | undefined> {
    this.logger.info(`Finding testing facility by id: ${id}`);

    const testingFacility = await this.database.findById(TestingFacility, id);

    if (testingFacility) {
      this.logger.info(`Successfully found testing facility by id: ${id}`);
      this.logger.debug(`Found testing facility data`, testingFacility.toJSON());
      return testingFacility;
    }

    this.logger.info(`Failed to find testing facility by id: ${id}`);
    return undefined;
  }

  public async findBySite(site: string): Promise<TestingFacility | undefined> {
    this.logger.info(`Finding testing facility by site: ${site}`);

    const testingFacility = await this.database.findOne(TestingFacility, {
      include: [],
      where: {
        site,
      },
    });

    if (testingFacility) {
      this.logger.info(`Successfully found testing facility by id: ${site}`);
      this.logger.debug(`Found testing facility data`, testingFacility.toJSON());
      return testingFacility;
    }

    this.logger.info(`Failed to find testing facility by site: ${site}`);
    return undefined;
  }

  public async findAllByState(state: string | State): Promise<TestingFacility[] | undefined> {
    this.logger.info(`Finding testing facility by state: ${state}`);

    const testingFacilities = await TestingFacility.findAll({
      include: [],
      where: {
        state,
      },
    });

    if (testingFacilities) {
      this.logger.info(`Successfully found testing facilities by state: ${state}`);
      this.logger.debug(`Found ${testingFacilities.length} testing facilities`);

      return testingFacilities;
    }

    this.logger.info(`Failed to find testing facilities by state: ${state}`);
    return undefined;
  }
}

export default TestingFacilityDao;
