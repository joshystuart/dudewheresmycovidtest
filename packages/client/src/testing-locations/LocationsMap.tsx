import React from 'react';
import { ICoordinates } from '../geolocation/useGeolocation';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ICovidTestingLocation } from './LocationsDao';
import { LocationMarker } from './LocationMarker';
import { config } from '../config/config';
import { GoogleMap as ReactGoogleMap, LoadScript } from '@react-google-maps/api';
import { useSelectedLocation } from './SelectedLocationContext';
import { UserMarker } from './UserMarker';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export type IFacilitiesMapProps = Required<ICoordinates> & {
  locations: ICovidTestingLocation[];
};

export function LocationsMap({ latitude, longitude, locations }: IFacilitiesMapProps) {
  const classes = useStyles();
  const { selectedLocation } = useSelectedLocation();

  const centerCoordinates = {
    lat: selectedLocation?.facility.location.latitude || latitude,
    lng: selectedLocation?.facility.location.longitude || longitude,
  };

  return (
    <Grid container className={classes.root}>
      {latitude && longitude && (
        <LoadScript googleMapsApiKey={config.maps.apiKey}>
          <ReactGoogleMap center={centerCoordinates} mapContainerStyle={{ height: `400px`, width: '100%' }} zoom={12}>
            <UserMarker latitude={latitude} longitude={longitude} />
            {locations.map((location) => {
              return <LocationMarker key={location.facility.id} location={location} />;
            })}
          </ReactGoogleMap>
        </LoadScript>
      )}
    </Grid>
  );
}
