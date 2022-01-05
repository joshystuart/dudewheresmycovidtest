import { Database, TestingFacilityDao } from '@dwmc-common/database';
import { DhhsVictoriaTestingFacilitiesApiDao } from '@dwmc-common/dhhs-victoria-website-data';
import { ILogger } from '@rafterjs/logger-plugin';

export class UpdateTestingFacilitiesDao {
  constructor(
    private readonly dhhsVictoriaTestingFacilitiesApiDao: DhhsVictoriaTestingFacilitiesApiDao,
    private readonly testingFacilityDao: TestingFacilityDao,
    private readonly database: Database,
    private readonly logger: ILogger,
  ) {}

  public async update(): Promise<void> {
    const dhhsTestingFacilities = await this.dhhsVictoriaTestingFacilitiesApiDao.getTestingFacilities();

    this.logger.info(`Found ${dhhsTestingFacilities.length} facilities`);

    if (dhhsTestingFacilities.length > 0) {
      for (const facilityModel of dhhsTestingFacilities) {
        try {
          this.logger.info(`Saving ${facilityModel.site}`);
          await this.testingFacilityDao.upsert(facilityModel);
        } catch (error) {
          this.logger.error(`Failed to create ${facilityModel.site}`, facilityModel, error);
        }
      }
    }
  }
}

export default UpdateTestingFacilitiesDao;
