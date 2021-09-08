import { useEffect, useState } from 'react';
import { usePosition } from 'use-position';

export type IGeolocationCoordinates = {
  latitude?: number;
  longitude?: number;
};

export type IUseGeolocation = IGeolocationCoordinates & {
  isLoading: boolean;
  errorMessage?: string;
};

export function useGeolocation(): IUseGeolocation {
  // @ts-ignore
  const { latitude, longitude, error } = usePosition(false);
  const [isLoading, setIsLoading] = useState(() => false);

  useEffect(() => {
    setIsLoading(!latitude || !longitude);
  }, [latitude, longitude]);

  return {
    latitude,
    longitude,
    errorMessage: error,
    isLoading,
  };
}
