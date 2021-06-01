import axios from 'axios';
import { config } from '../config/config';
import { IFacility } from '../../../api/lib/testing-facilities/adapters/dhhs-website/Facility';

export type ICovidTestingLocation = {
  facility: IFacility;
  distance: number;
  travelTime: number;
};

export type IFacilityResponse = {
  data: ICovidTestingLocation[];
};

export async function getCovidTestingLocations(latitude: number, longitude: number) {
  const { data } = await axios.get<IFacilityResponse>(`${config.api.endpoint}/facilities`, {
    params: {
      latitude,
      longitude,
    },
  });

  return data.data;
}
