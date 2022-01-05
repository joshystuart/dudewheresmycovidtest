import { ITestingFacilityLocation } from './TestingFacilityLocation';
import { TestingFacilityType } from './TestingFacilityType';

// eslint-disable-next-line no-shadow
export enum Status {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  TEMPORARILY_CLOSED = 'TEMPORARILY_CLOSED',
  AT_CAPACITY = 'AT_CAPACITY',
  UNKNOWN = 'UNKNOWN',
}

export interface ITestingFacility {
  id: number;
  site: string;
  type: TestingFacilityType | string;
  details: string;
  ageLimit: string;
  location: ITestingFacilityLocation;
  phoneNumber: string;
  website: string;
  availability: string;
  requirements: string;
  currentWaitTime?: number;
  currentWaitTimeDescription?: string;
  status: Status;
}
