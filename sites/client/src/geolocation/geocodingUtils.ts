import { IGeolocationCoordinates } from './useGeolocation';
import { State } from '@dwmc-common/testing-facilities';

export function getStateFromAddress(address: string): State {
  if (address.indexOf(` ${State.ACT}`) > -1) {
    return State.ACT;
  } else if (address.indexOf(` ${State.NSW}`) > -1) {
    return State.NSW;
  } else if (address.indexOf(` ${State.NT}`) > -1) {
    return State.NT;
  } else if (address.indexOf(` ${State.QLD}`) > -1) {
    return State.QLD;
  } else if (address.indexOf(` ${State.SA}`) > -1) {
    return State.SA;
  } else if (address.indexOf(` ${State.TAS}`) > -1) {
    return State.TAS;
  } else if (address.indexOf(` ${State.VIC}`) > -1) {
    return State.VIC;
  } else if (address.indexOf(` ${State.WA}`) > -1) {
    return State.WA;
  }

  return State.VIC;
}

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
