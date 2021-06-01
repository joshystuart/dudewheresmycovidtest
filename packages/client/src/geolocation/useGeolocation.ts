import { usePosition } from 'use-position';
import { useEffect, useState } from 'react';

export type ICoordinates = {
  latitude?: number;
  longitude?: number;
};
export type IUseGeolocation = ICoordinates & {
  isLoading: boolean;
  errorMessage?: string;
};

export function useGeolocation(): IUseGeolocation {
  // @ts-ignore
  const { latitude, longitude, error } = usePosition(false);
  const [isLoading, setIsLoading] = useState(() => true);

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
