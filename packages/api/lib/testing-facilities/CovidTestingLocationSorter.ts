import { ICovidTestingLocation } from './CovidTestingLocationTransformer';

export const MISSING_WAIT_TIME_OFFSET = 240;

export class CovidTestingLocationSorter {
  public sortByTotalEstimatedTime(covidTestingFacilityDistances: ICovidTestingLocation[]): ICovidTestingLocation[] {
    return covidTestingFacilityDistances.sort((facility1, facility2) => {
      const totalEstimatedTime1 = (facility1.facility.waitTime || MISSING_WAIT_TIME_OFFSET) + facility1.travelTime;
      const totalEstimatedTime2 = (facility2.facility.waitTime || MISSING_WAIT_TIME_OFFSET) + facility2.travelTime;

      if (totalEstimatedTime1 < totalEstimatedTime2) {
        return -1;
      }

      if (totalEstimatedTime1 > totalEstimatedTime2) {
        return 1;
      }
      return 0;
    });
  }

  public sortByDistance(covidTestingFacilityDistances: ICovidTestingLocation[]): ICovidTestingLocation[] {
    return covidTestingFacilityDistances.sort((facility1, facility2) => {
      const distance1 = facility1.distance;
      const distance2 = facility2.distance;

      if (distance1 < distance2) {
        return -1;
      }

      if (distance1 > distance2) {
        return 1;
      }
      return 0;
    });
  }

  public sortByWaitTime(covidTestingFacilityDistances: ICovidTestingLocation[]): ICovidTestingLocation[] {
    return covidTestingFacilityDistances.sort((facility1, facility2) => {
      const estimatedWaitTime1 = facility1.facility.waitTime || MISSING_WAIT_TIME_OFFSET;
      const estimatedWaitTime2 = facility2.facility.waitTime || MISSING_WAIT_TIME_OFFSET;

      if (estimatedWaitTime1 < estimatedWaitTime2) {
        return -1;
      }

      if (estimatedWaitTime1 > estimatedWaitTime2) {
        return 1;
      }
      return 0;
    });
  }
}

export default CovidTestingLocationSorter;
