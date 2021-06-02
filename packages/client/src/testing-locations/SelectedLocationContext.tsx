import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { ICovidTestingLocation } from './LocationsDao';
import { useCovidTestingLocations } from './CovidTestingLocationsContext';

export interface ISelectedLocationContext {
  selectedLocation?: ICovidTestingLocation;
  setSelectedLocation: (id: string | undefined) => void;
}

export const SelectedLocationContext = createContext<ISelectedLocationContext>({
  setSelectedLocation: () => {},
});

export const useSelectedLocation = (): ISelectedLocationContext =>
  useContext<ISelectedLocationContext>(SelectedLocationContext);

export type ISelectedFacilityContextProviderProps = {
  children: ReactElement[] | ReactElement | string;
};

export function SelectedLocationContextProvider({ children }: ISelectedFacilityContextProviderProps) {
  const { locations } = useCovidTestingLocations();
  const [selectedLocation, setSelectedLocation] = useState<ICovidTestingLocation>();

  const handleSetSelectedLocation = (id: string | undefined) => {
    if (id && locations?.length && selectedLocation?.facility.id !== id) {
      const newSelectedLocation = locations.find((covidTestingLocation) => {
        return covidTestingLocation.facility.id === id;
      });

      if (newSelectedLocation) {
        setSelectedLocation(newSelectedLocation);
      } else {
        console.error(`Failed to find the facility with id ${id} in `, locations);
      }
    } else {
      setSelectedLocation(undefined);
    }
  };

  useEffect(() => {
    if (!locations || locations?.length <= 0) {
      setSelectedLocation(undefined);
    }
  }, [locations]);

  return (
    <SelectedLocationContext.Provider value={{ selectedLocation, setSelectedLocation: handleSetSelectedLocation }}>
      {children}
    </SelectedLocationContext.Provider>
  );
}
