/* eslint-disable camelcase */

export interface IDhhsVictoriaTestingFacility {
  _id: number;
  Site_ID: string;
  Site_Name: string;
  Facility: string;
  Website: string;
  Phone: string;
  Attendance_Instructions: string | null;
  Site_Facilities: string | null;
  Service_Availability: string;
  Address: string;
  Suburb: string;
  State: string;
  Postcode: string;
  LGA: string;
  Latitude: string;
  Longitude: string;
  Delay: string | null;
  DelayText: string;
  Requirements: string;
  SymptomaticTestingOnly: string;
  Directions: string;
  TestTracker: string;
  AgeLimit: string;
  AddressOther: string | null;
  ServiceType: string;
  FacilityType: string;
  ServiceFormat: string;
  Mo_Start: string;
  Mo_End: string;
  Tu_Start: string;
  Tu_End: string;
  We_Start: string;
  We_End: string;
  Th_Start: string;
  Th_End: string;
  Fr_Start: string;
  Fr_End: string;
  Sa_Start: string;
  Sa_End: string;
  Su_Start: string;
  Su_End: string;
  Start_Lunch: string | null;
  End_Lunch: string | null;
  Description: string | null;
  Translation_Services: string | null;
  Toilets_Available: string;
  Parking_Options: string | null;
  Accessible_Parking: string | null;
  Status: string;
  StatusAlert: string | null;
  LastUpdatedTime: string;
}

export interface IDhhsVictoriaTestingFacilitiesApiResponse {
  total: number;
  results: IDhhsVictoriaTestingFacility[];
}
