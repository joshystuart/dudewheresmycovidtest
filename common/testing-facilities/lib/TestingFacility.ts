import { ITestingFacilityLocation } from './TestingFacilityLocation';
import { TestingFacilityType } from './TestingFacilityType';

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
}
