import React from 'react';
import { IGeolocationCoordinates } from '../../geolocation/useGeolocation';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ICovidTestingLocation } from '../LocationsDao';
import { LocationMarker } from './LocationMarker';
import { GoogleMap as ReactGoogleMap } from '@react-google-maps/api';
import { useSelectedLocation } from '../SelectedLocationContext';
import { UserMarker } from './UserMarker';
import { Overlay } from '../../components/Overlay';
import { useCovidTestingLocations } from '../CovidTestingLocationsContext';
import { useUserContext } from '../user/UserContext';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export type IFacilitiesMapProps = IGeolocationCoordinates & {
  locations: ICovidTestingLocation[];
};

// Flinders st
export const DEFAULT_COORDINATES = {
  latitude: -37.81757170760252,
  longitude: 144.96735724211655,
};

export function LocationsMap({
  latitude = DEFAULT_COORDINATES.latitude,
  longitude = DEFAULT_COORDINATES.longitude,
  locations,
}: IFacilitiesMapProps) {
  const classes = useStyles();
  const { selectedLocation } = useSelectedLocation();
  const { isLoading: isLocationsLoading } = useCovidTestingLocations();
  const { isLoading: isUserLoading } = useUserContext();

  const centerCoordinates = {
    lat: selectedLocation?.facility.location.latitude || latitude,
    lng: selectedLocation?.facility.location.longitude || longitude,
  };

  return (
    <Grid container className={classes.root}>
      <Overlay show={isLocationsLoading || isUserLoading}>
        <>
          {latitude && longitude && (
            <ReactGoogleMap center={centerCoordinates} mapContainerStyle={{ height: `400px`, width: '100%' }} zoom={12}>
              <UserMarker latitude={latitude} longitude={longitude} />
              {locations.map((location) => {
                return <LocationMarker key={location.facility.id} location={location} />;
              })}
            </ReactGoogleMap>
          )}
        </>
      </Overlay>
    </Grid>
  );
}
