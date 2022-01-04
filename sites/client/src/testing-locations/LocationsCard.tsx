import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Banner } from '../components/Banner';
import { useCovidTestingLocations } from './CovidTestingLocationsContext';
import { LocationDetailsModal } from './details/LocationDetailsModal';
import { FilterBy, filterFacilities } from './list/FilterBy';
import { LocationsList, ViewBy } from './list/LocationsList';
import { LocationsListOptions } from './list/LocationsListOptions';
import { SortBy, sortFacilities } from './list/SortBy';
import { LocationsMap } from './map/LocationsMap';
import { SupportBanner } from './support/SupportBanner';
import { useUserContext } from './user/UserContext';
import { UserLocation } from './user/UserLocation';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingBottom: 100,
    },
  }),
);

export function LocationsCard() {
  const classes = useStyles();
  const { locations = [] } = useCovidTestingLocations();
  const { coordinates } = useUserContext();

  const [sortBy, setSortBy] = useState(SortBy.distance);
  const [filterBy, setFilterBy] = useState(FilterBy.all);
  const [viewBy, setViewBy] = useState(() => ViewBy.list);

  const filteredFacilities = filterFacilities(locations, filterBy);
  const sortedCovidTestingLocations = sortFacilities(filteredFacilities, sortBy);

  return (
    <Box className={classes.root}>
      <UserLocation />
      <SupportBanner />
      <LocationsListOptions
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        viewBy={viewBy}
        setViewBy={setViewBy}
      />
      <Banner
        title="NOTE"
        message="Victoria Health are not currently reporting 'wait time' data. Unfortunately this means I cannot provide accurate estimates on wait times at testing facilities. I am working on a solution, but for now, do not trust the 'wait times' listed. Sorry for the inconvenience."
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
