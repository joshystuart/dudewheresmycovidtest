import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { getCovidTestingLocations, ICovidTestingLocation } from './LocationsDao';
import { ICoordinates } from '../geolocation/useGeolocation';
import { SelectedLocationContextProvider } from './SelectedLocationContext';

export interface IFacilitiesContext {
  locations?: ICovidTestingLocation[];
  error?: Error;
}

export const LocationsContext = createContext<IFacilitiesContext>({});

export const useCovidTestingLocations = (): IFacilitiesContext => useContext<IFacilitiesContext>(LocationsContext);

export type IFacilitiesContextProviderProps = Required<ICoordinates> & {
  children: ReactElement[] | ReactElement | string;
};

export function FacilitiesContextProvider({ children, longitude, latitude }: IFacilitiesContextProviderProps) {
  const [locations, setLocationsContext] = useState<IFacilitiesContext['locations']>();
  const [error, setError] = useState<IFacilitiesContext['error']>();

  useEffect(() => {
    getCovidTestingLocations(latitude, longitude)
      .then((locations) => {
        setLocationsContext(locations);
      })
      .catch((error) => {
        setError(error);
      });
  }, [latitude, longitude]);

  return (
    <LocationsContext.Provider value={{ locations, error }}>
      <SelectedLocationContextProvider>{children}</SelectedLocationContextProvider>
    </LocationsContext.Provider>
  );
}

export const LocationsContextConsumer = LocationsContext.Consumer;
