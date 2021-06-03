import React from 'react';
import { Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useCovidTestingLocations } from './CovidTestingLocationsContext';
import { LocationsMap } from './map/LocationsMap';
import { LocationsList } from './list/LocationsList';
import { UserLocation } from './user/UserLocation';
import { useUserContext } from './user/UserContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export function LocationsCard() {
  const classes = useStyles();
  const { locations = [] } = useCovidTestingLocations();
  const { coordinates } = useUserContext();

  return (
    <Paper className={classes.paper}>
      <UserLocation />
      <LocationsMap locations={locations} longitude={coordinates?.longitude} latitude={coordinates?.latitude} />
      <LocationsList facilities={locations} />
    </Paper>
  );
}
