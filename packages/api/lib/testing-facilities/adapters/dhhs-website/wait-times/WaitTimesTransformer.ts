import { IWaitTimesSpreadsheet } from './WaitTimesSpreadsheet';
import { IWaitTimes } from './WaitTimes';
import { FacilityIdHelper } from '../FacilityIdHelper';

export class WaitTimesTransformer {
  constructor(private readonly facilityIdHelper: FacilityIdHelper) {}

  public async convert(testingFacilities: IWaitTimesSpreadsheet): Promise<IWaitTimes[]> {
    const waitTimes: IWaitTimes[] = [];

    for (const entry of testingFacilities.feed.entry) {
      const time = Number(entry.gsx$delaymins.$t);

      const facility: IWaitTimes = {
        id: this.facilityIdHelper.createId(entry.gsx$site.$t, entry.gsx$facility.$t),
        time: time > 0 ? time : undefined,
        details: entry.gsx$delaytext.$t,
      };

      waitTimes.push(facility);
    }

    return waitTimes;
  }
}

export default WaitTimesTransformer;
