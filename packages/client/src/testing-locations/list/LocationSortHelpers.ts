import { sort } from 'fast-sort';
import { ICovidTestingLocation } from '../LocationsDao';

export enum LocationSortHelpers {
  waitTime = 'waitTime',
  distance = 'distance',
  totalTime = 'totalTime',
}

export function sortFacilities(
  facilities: ICovidTestingLocation[],
  sortBy: LocationSortHelpers,
): ICovidTestingLocation[] {
  switch (sortBy) {
    case LocationSortHelpers.distance:
      return sortFacilitiesByDistance(facilities);
    case LocationSortHelpers.waitTime:
      return sortFacilitiesByWaitTime(facilities);
    case LocationSortHelpers.totalTime:
    default:
      return sortFacilitiesByTotalTime(facilities);
  }
}

export function sortFacilitiesByDistance(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return sort(facilities).by([
    {
      asc: (prop) => prop.distance,
    },
    {
      asc: (prop) => prop.facility.site,
    },
  ]);
}

export function sortFacilitiesByTotalTime(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return sort(
    facilities.filter(({ facility }) => {
      return typeof facility.waitTime === 'number';
    }),
  ).by([
    {
      asc: (prop) => (prop.facility.waitTime || 0) + prop.travelTime,
    },
    {
      asc: (prop) => prop.distance,
    },
  ]);
}

export function sortFacilitiesByWaitTime(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return sort(
    facilities.filter(({ facility }) => {
      return typeof facility.waitTime === 'number';
    }),
  ).by([
    {
      asc: (prop) => prop.facility.waitTime,
    },
    {
      asc: (prop) => prop.distance,
    },
  ]);
}
