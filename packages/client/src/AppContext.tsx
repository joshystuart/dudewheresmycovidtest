import React, { createContext, ReactElement } from 'react';
import { UserContextProvider } from './testing-locations/user/UserContext';
import { CovidTestingLocationsContextProvider } from './testing-locations/CovidTestingLocationsContext';
import { config } from './config/config';
import { LoadScript } from '@react-google-maps/api';

export interface IAppContext {}

export const AppContextContext = createContext<IAppContext>({});

export type IAppContextProviderProps = {
  children: ReactElement[] | ReactElement | string;
};

export function AppContextProvider({ children }: IAppContextProviderProps) {
  const { apiKey, libraries } = config.google;
  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <UserContextProvider>
        <CovidTestingLocationsContextProvider>
          <AppContextContext.Provider value={{}}>{children}</AppContextContext.Provider>
        </CovidTestingLocationsContextProvider>
      </UserContextProvider>
    </LoadScript>
  );
}

export const AppContextContextConsumer = AppContextContext.Consumer;
