import { ICovidTestingLocation } from '../LocationsDao';
import { isClinic, isDriveThrough, isHospital } from '../FacilityHelpers';

export enum FilterBy {
  all = 'all',
  clinics = 'clinics',
  driveThrough = 'driveThrough',
  hospitals = 'hospitals',
}

export function filterFacilities(facilities: ICovidTestingLocation[], sortBy: FilterBy): ICovidTestingLocation[] {
  switch (sortBy) {
    case FilterBy.clinics:
      return filterByClinics(facilities);
    case FilterBy.hospitals:
      return filterByHospitals(facilities);
    case FilterBy.driveThrough:
      return filterByDriveThroughs(facilities);
    case FilterBy.all:
    default:
      return facilities;
  }
}

export function filterByClinics(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return facilities.filter(({ facility }) => {
    return isClinic(facility);
  });
}

export function filterByHospitals(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return facilities.filter(({ facility }) => {
    return isHospital(facility);
  });
}

export function filterByDriveThroughs(facilities: ICovidTestingLocation[]): ICovidTestingLocation[] {
  return facilities.filter(({ facility }) => {
    return isDriveThrough(facility);
  });
}
