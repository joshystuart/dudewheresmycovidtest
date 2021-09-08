import axios from 'axios';
import { config } from '../config/config';
import { ITestingFacility, State } from '@dwmc-common/testing-facilities';

export type ICovidTestingLocation = {
  facility: ITestingFacility;
  distance: number;
  travelTime: number;
};

export type IFacilityResponse = {
  data: ICovidTestingLocation[];
};

export async function getCovidTestingLocations(latitude: number, longitude: number, state: State = State.VIC) {
  const { data } = await axios.get<IFacilityResponse>(`${config.api.endpoint}/facilities`, {
    params: {
      latitude,
      longitude,
      state,
    },
  });

  return data.data;
}
