import { sort } from 'fast-sort';
import { ICovidTestingLocation } from '../LocationsDao';

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
      return typeof facility.currentWaitTime === 'number';
    }),
  ).by([
    {
      asc: (prop) => (prop.facility.currentWaitTime || 0) + prop.travelTime,
    },
    {
      asc: (prop) => prop.distance,
    },
  ]);
}

export function sortFacilitiesByWaitTime(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return sort(
    facilities.filter(({ facility }) => {
      return typeof facility.currentWaitTime === 'number';
    }),
  ).by([
    {
      asc: (prop) => prop.facility.currentWaitTime,
    },
    {
      asc: (prop) => prop.distance,
    },
  ]);
}
