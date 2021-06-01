import React, { useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useCovidTestingLocations } from './LocationsContext';
import { LocationsMap } from './LocationsMap';
import { useGeolocation } from '../geolocation/useGeolocation';
import { LocationsList } from './LocationsList';
import { LocationsSortOptions } from './LocationsSortOptions';
import { SortBy } from './SortBy';

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
  const [sortBy, setSortBy] = useState(() => SortBy.distance);
  const { locations } = useCovidTestingLocations();
  const { latitude, longitude } = useGeolocation();

  if (locations?.length && latitude && longitude) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">
          Your latitude and longitude is: {latitude}, {longitude}
        </Typography>
        <LocationsMap locations={locations} longitude={longitude} latitude={latitude} />
        <LocationsSortOptions sortBy={sortBy} handleSortBy={setSortBy} />
        <LocationsList facilities={locations} sortBy={sortBy} />
      </Paper>
    );
  }

  return <></>;
}
