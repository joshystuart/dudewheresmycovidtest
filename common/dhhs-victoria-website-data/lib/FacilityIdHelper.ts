import { createHash } from 'crypto';

export class FacilityIdHelper {
  public createId(site: string, facility: string): string {
    return createHash('md5')
      .update(site + facility)
      .digest('hex');
  }
}

export default FacilityIdHelper;
