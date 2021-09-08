import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { getCovidTestingLocations, ICovidTestingLocation } from './LocationsDao';
import { IGeolocationCoordinates } from '../geolocation/useGeolocation';
import { SelectedLocationContextProvider } from './SelectedLocationContext';
import { useUserContext } from './user/UserContext';

export interface IFacilitiesContext {
  locations?: ICovidTestingLocation[];
  isLoading: boolean;
  error?: Error;
}

export const CovidTestingLocationsContext = createContext<IFacilitiesContext>({ isLoading: false });

export const useCovidTestingLocations = (): IFacilitiesContext =>
  useContext<IFacilitiesContext>(CovidTestingLocationsContext);

export type IFacilitiesContextProviderProps = IGeolocationCoordinates & {
  children: ReactElement[] | ReactElement | string;
};

export function CovidTestingLocationsContextProvider({ children }: IFacilitiesContextProviderProps) {
  const { coordinates, address, state } = useUserContext();
  const [{ isLoading, error, locations }, setCovidTestingLocationsContext] = useState<IFacilitiesContext>({
    isLoading: false,
  });

  useEffect(() => {
    // TODO, there may be a better way of structuring this
    if (coordinates && !isLoading) {
      setCovidTestingLocationsContext({ isLoading: true, error: undefined, locations: [] });
      const { latitude, longitude } = coordinates;

      getCovidTestingLocations(latitude, longitude, state)
        .then((locations) => {
          setCovidTestingLocationsContext((context) => ({ isLoading: false, error: context.error, locations }));
        })
        .catch((covidTestingLocationsError) => {
          setCovidTestingLocationsContext({ isLoading: false, error: covidTestingLocationsError, locations: [] });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, address]);

  return (
    <CovidTestingLocationsContext.Provider value={{ locations, error, isLoading }}>
      <SelectedLocationContextProvider>{children}</SelectedLocationContextProvider>
    </CovidTestingLocationsContext.Provider>
  );
}

export const CovidTestingLocationsContextConsumer = CovidTestingLocationsContext.Consumer;
