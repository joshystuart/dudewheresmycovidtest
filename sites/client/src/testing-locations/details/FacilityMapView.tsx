import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { ITestingFacility } from '@dwmc-common/testing-facilities';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export type IFacilitiesMapProps = {
  facility: ITestingFacility;
};

export function FacilityMapView({ facility }: IFacilitiesMapProps) {
  const classes = useStyles();
  const { latitude, longitude } = facility.location;

  const coordinates = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <Grid container className={classes.root}>
      <>
        {latitude && longitude && (
          <GoogleMap center={coordinates} mapContainerStyle={{ height: `400px`, width: '100%' }} zoom={12}>
            <Marker position={coordinates} />
          </GoogleMap>
        )}
      </>
    </Grid>
  );
}
