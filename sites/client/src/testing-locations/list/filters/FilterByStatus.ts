import { ICovidTestingLocation } from '../../LocationsDao';

export enum FilterByStatus {
  ALL = 'ALL',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  TEMPORARILY_CLOSED = 'TEMPORARILY_CLOSED',
  AT_CAPACITY = 'AT_CAPACITY',
  UNKNOWN = 'UNKNOWN',
}

export function filterFacilitiesByStatus(
  facilities: ICovidTestingLocation[],
  filterByStatus: FilterByStatus,
): ICovidTestingLocation[] {
  if (filterByStatus === FilterByStatus.ALL) {
    return facilities;
  }

  return facilities.filter(({ facility }) => {
    return facility?.status?.toString() === filterByStatus;
  });
}
