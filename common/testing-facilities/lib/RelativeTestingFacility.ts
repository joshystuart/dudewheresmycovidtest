import { ITestingFacility } from './TestingFacility';

export type IRelativeTestingFacility = {
  facility: ITestingFacility;
  distance: number;
  travelTime: number;
};
