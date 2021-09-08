import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useCovidTestingLocations } from './CovidTestingLocationsContext';
import { LocationsMap } from './map/LocationsMap';
import { LocationsList, ViewBy } from './list/LocationsList';
import { UserLocation } from './user/UserLocation';
import { useUserContext } from './user/UserContext';
import { FilterBy, filterFacilities } from './list/FilterBy';
import { SortBy, sortFacilities } from './list/SortBy';
import { LocationsListOptions } from './list/LocationsListOptions';
import { LocationDetailsModal } from './details/LocationDetailsModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export function LocationsCard() {
  const classes = useStyles();
  const { locations = [] } = useCovidTestingLocations();
  const { coordinates } = useUserContext();

  const [sortBy, setSortBy] = useState(SortBy.totalTime);
  const [filterBy, setFilterBy] = useState(FilterBy.all);
  const [viewBy, setViewBy] = useState(() => ViewBy.list);

  const filteredFacilities = filterFacilities(locations, filterBy);
  const sortedCovidTestingLocations = sortFacilities(filteredFacilities, sortBy);

  return (
    <Box className={classes.root}>
      <UserLocation />
      <LocationsListOptions
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        viewBy={viewBy}
        setViewBy={setViewBy}
      />
      {viewBy === ViewBy.map && (
        <LocationsMap
          locations={sortedCovidTestingLocations}
          longitude={coordinates?.longitude}
          latitude={coordinates?.latitude}
        />
      )}
      {viewBy === ViewBy.list && <LocationsList locations={sortedCovidTestingLocations} sortBy={sortBy} />}
      <LocationDetailsModal />
    </Box>
  );
}
