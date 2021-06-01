// eslint-disable-next-line no-shadow

export interface ILocation {
  address: string;
  suburb: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface ITestingFacility {
  id: string;
  site: string;
  type: string;
  details: string;
  ageLimit: string;
  location: ILocation;
  phoneNumber: string;
  website: string;
  availability: string;
  requirements: string;
}
