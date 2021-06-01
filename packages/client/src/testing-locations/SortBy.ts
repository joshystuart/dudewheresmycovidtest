import { ICovidTestingLocation } from './LocationsDao';

export enum SortBy {
  waitTime = 'waitTime',
  distance = 'distance',
  totalTime = 'totalTime',
}

export function sortFacilities(facilities: ICovidTestingLocation[], sortBy: SortBy): ICovidTestingLocation[] {
  switch (sortBy) {
    case SortBy.distance:
      return sortFacilitiesByDistance(facilities);
    case SortBy.waitTime:
      return sortFacilitiesByWaitTime(facilities);
    case SortBy.totalTime:
    default:
      return sortFacilitiesByTotalTime(facilities);
  }
}

export function sortFacilitiesByDistance(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return facilities.sort((facility1, facility2) => {
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

export function sortFacilitiesByTotalTime(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return facilities
    .filter(({ facility }) => {
      return facility.waitTime && facility.waitTime > 0;
    })
    .sort((facility1, facility2) => {
      const totalEstimatedTime1 = (facility1.facility.waitTime || 0) + facility1.travelTime;
      const totalEstimatedTime2 = (facility2.facility.waitTime || 0) + facility2.travelTime;

      if (totalEstimatedTime1 < totalEstimatedTime2) {
        return -1;
      }

      if (totalEstimatedTime1 > totalEstimatedTime2) {
        return 1;
      }
      return 0;
    });
}

export function sortFacilitiesByWaitTime(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return facilities
    .filter(({ facility }) => {
      return facility.waitTime && facility.waitTime > 0;
    })
    .sort((facility1, facility2) => {
      const estimatedWaitTime1 = facility1.facility.waitTime || 0;
      const estimatedWaitTime2 = facility2.facility.waitTime || 0;

      if (estimatedWaitTime1 < estimatedWaitTime2) {
        return -1;
      }

      if (estimatedWaitTime1 > estimatedWaitTime2) {
        return 1;
      }
      return 0;
    });
}
