import { ITestingFacility, Status } from '@dwmc-common/testing-facilities';

export const HOSPITALS = ['Hospital Respiratory Clinic'];
export const CLINICS = ['Pathology Collection Centre', 'GP Respiratory Clinic', 'Community Health Respiratory Clinic'];
export const DRIVE_THROUGHS = ['Drive-through Testing Facility'];
export const WALK_THROUGHS = ['Walk-through Testing Facility'];

export function isDriveThrough(facility: ITestingFacility): boolean {
  return DRIVE_THROUGHS.includes(facility.type) || facility.site.includes('Drive Through');
}

export function isWalkup(facility: ITestingFacility): boolean {
  return WALK_THROUGHS.includes(facility.type);
}

export function isClinic(facility: ITestingFacility): boolean {
  return CLINICS.includes(facility.type) && !isDriveThrough(facility);
}

export function isHospital(facility: ITestingFacility): boolean {
  return HOSPITALS.includes(facility.type);
}

export function isOpen(facility: ITestingFacility): boolean {
  return facility.status === Status.OPEN;
}

export function isClosed(facility: ITestingFacility): boolean {
  return facility.status === Status.CLOSED || facility.status === Status.TEMPORARILY_CLOSED;
}

export function isAtCapacity(facility: ITestingFacility): boolean {
  return facility.status === Status.AT_CAPACITY;
}

export function isClosedPermanently(facility: ITestingFacility): boolean {
  return facility.status === Status.UNKNOWN;
}

export function requiresAppointment(facility: ITestingFacility): boolean {
  return facility.requirements.toLowerCase().includes('appointment');
}

export function requiresReferral(facility: ITestingFacility): boolean {
  return facility.requirements.toLowerCase().includes('referral');
}
