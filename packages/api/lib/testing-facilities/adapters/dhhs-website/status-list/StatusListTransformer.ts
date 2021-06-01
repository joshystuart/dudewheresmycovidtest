import { IStatusListSpreadsheet } from './StatusListSpreadsheet';
import { IStatusList } from './StatusList';
import { FacilityIdHelper } from '../FacilityIdHelper';

export class StatusListTransformer {
  constructor(private readonly facilityIdHelper: FacilityIdHelper) {}

  public async convert(testingFacilities: IStatusListSpreadsheet): Promise<IStatusList[]> {
    const statusLists: IStatusList[] = [];

    for (const entry of testingFacilities.feed.entry) {
      const facility: IStatusList = {
        id: this.facilityIdHelper.createId(entry.gsx$sitename.$t, entry.gsx$facility.$t),
        site: entry.gsx$sitename.$t,
      };

      statusLists.push(facility);
    }

    return statusLists;
  }
}

export default StatusListTransformer;
