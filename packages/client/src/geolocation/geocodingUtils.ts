import { IGeolocationCoordinates } from './useGeolocation';

export async function getAddressFromCoordinates({
  latitude,
  longitude,
}: Required<IGeolocationCoordinates>): Promise<string | undefined> {
  // TODO, find an npm package for this OR create a PR for
  const geocoder = new window.google.maps.Geocoder();
  const isGeocodeAvailable = window.google?.maps?.GeocoderStatus.OK;

  if (isGeocodeAvailable) {
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        {
          location: {
            lat: latitude,
            lng: longitude,
          },
        },
        (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            // just get the first result
            resolve(results[0].formatted_address);
          } else {
            reject('Failed to get an address from the coordinates');
          }
        },
      );
    });
  }

  return undefined;
}
