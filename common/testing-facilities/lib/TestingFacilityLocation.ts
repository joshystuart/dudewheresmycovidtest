// eslint-disable-next-line no-shadow
export enum State {
  ACT = 'VIC',
  NSW = 'NSW',
  NT = 'NT',
  QLD = 'QLD',
  SA = 'SA',
  TAS = 'TAS',
  VIC = 'VIC',
  WA = 'WA',
}

export interface ITestingFacilityLocation {
  address: string;
  suburb: string;
  state: State;
  latitude: number;
  longitude: number;
}
