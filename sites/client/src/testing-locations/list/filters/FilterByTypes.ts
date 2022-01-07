import { ICovidTestingLocation } from '../../LocationsDao';
import { isClinic, isDriveThrough, isHospital } from '../../FacilityHelpers';

export enum FilterByTypes {
  all = 'all',
  clinics = 'clinics',
  driveThrough = 'driveThrough',
  hospitals = 'hospitals',
}

export function filterFacilitiesByType(
  facilities: ICovidTestingLocation[],
  filterByType: FilterByTypes,
): ICovidTestingLocation[] {
  switch (filterByType) {
    case FilterByTypes.clinics:
      return filterByClinics(facilities);
    case FilterByTypes.hospitals:
      return filterByHospitals(facilities);
    case FilterByTypes.driveThrough:
      return filterByDriveThroughs(facilities);
    case FilterByTypes.all:
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
