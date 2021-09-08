/* eslint-disable camelcase */

export interface IHealthDirectHealthCareServiceOpenRule {
  pattern: string;
  days: string[];
  openFrom: string;
  openTo: string;
  referenceDate: string;
}

export interface IHealthDirectHealthCareService {
  description: string;
  calendar: {
    openRule: IHealthDirectHealthCareServiceOpenRule[];
    timezone: string;
  };
  organisation: {
    id: string;
    name: string;
  };
  location: {
    id: string;
    deliveryMethod: string;
    physicalLocation: {
      addressLine1?: string;
      addressLine2?: string;
      addressLine3?: string;
      postcode: string;
      suburb: {
        label: string;
        postcode: string;
      };
      state: {
        label: string;
      };
      country: {
        label: string;
      };
      geocode: {
        latitude: string;
        longitude: string;
      };
    };
  };
}

export interface IHealthDirectResponse {
  count: number;
  offset: number;
  limit: number;
  _embedded: {
    healthcareServices: IHealthDirectHealthCareService[];
  };
}
