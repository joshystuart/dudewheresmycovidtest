import React from 'react';
import { useGeolocation } from './useGeolocation';
import { Overlay } from '../utils/Overlay';
import { ErrorOverlay } from '../utils/ErrorOverlay';

export function GeoLocationLoader() {
  const { isLoading, errorMessage } = useGeolocation();

  if (!errorMessage) {
    return <Overlay message="Getting your location from your browser." open={isLoading} />;
  } else {
    return (
      <ErrorOverlay
        title={errorMessage}
        message="Please ensure you have allowed location services on your browser."
        open={true}
      />
    );
  }
}
