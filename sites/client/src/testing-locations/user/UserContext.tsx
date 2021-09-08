import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { useGeolocation } from '../../geolocation/useGeolocation';
import { getAddressFromCoordinates, getStateFromAddress } from '../../geolocation/geocodingUtils';
import { IUserLocationCoordinates } from './User';
import { State } from '@dwmc-common/testing-facilities';

export interface IUserContext {
  isLoading: boolean;
  address?: string;
  state?: State;
  setAddress: (address: string) => void;
  coordinates?: IUserLocationCoordinates;
  setCoordinates: (coordinates: IUserLocationCoordinates) => void;
}

export const UserContextContext = createContext<IUserContext>({
  isLoading: true,
  setAddress: (address: string) => {},
  setCoordinates: (coordinates: IUserLocationCoordinates) => {},
});

export const useUserContext = (): IUserContext => useContext<IUserContext>(UserContextContext);

export type IUserContextProviderProps = {
  children: ReactElement[] | ReactElement | string;
};

export function UserContextProvider({ children }: IUserContextProviderProps) {
  const [address, localSetAddress] = useState<string>();
  const [state, setState] = useState<State>();
  const [isLoading, setIsLoading] = useState<boolean>(() => true);
  const [useBrowserLocation, setUseBrowserLocation] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<IUserLocationCoordinates>();

  // when we set the address we also get the state from the address string so we can reference it easily
  function setAddress(addressToSet: string) {
    localSetAddress(addressToSet);
    setState(getStateFromAddress(addressToSet));
  }

  const contextValues = {
    isLoading,
    address,
    state,
    setAddress,
    coordinates,
    setCoordinates,
  };

  // try and get the location from the browser
  const browserLocation = useGeolocation();
  useEffect(() => {
    if (useBrowserLocation) {
      const updateAddressFromBrowserCoordinates = async (coords: IUserLocationCoordinates) => {
        const address = await getAddressFromCoordinates(coords);
        if (address) {
          setAddress(address);
        }
        setIsLoading(false);
      };

      const { isLoading: isBrowserLoadingLocation, latitude, longitude, errorMessage } = browserLocation;

      if (!isBrowserLoadingLocation && latitude && longitude && !coordinates && !errorMessage) {
        setCoordinates({ longitude, latitude });

        updateAddressFromBrowserCoordinates({ longitude, latitude });
      } else if (errorMessage) {
        setUseBrowserLocation(false);
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserLocation, useBrowserLocation]);

  return <UserContextContext.Provider value={contextValues}>{children}</UserContextContext.Provider>;
}

export const UserContextContextConsumer = UserContextContext.Consumer;
