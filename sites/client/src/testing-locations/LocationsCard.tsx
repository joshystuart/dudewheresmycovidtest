import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Banner } from '../components/Banner';
import { useCovidTestingLocations } from './CovidTestingLocationsContext';
import { LocationDetailsModal } from './details/LocationDetailsModal';
import { FilterByStatus, filterFacilitiesByStatus } from './list/filters/FilterByStatus';
import { FilterByTypes, filterFacilitiesByType } from './list/filters/FilterByTypes';
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

  const [sortBy, setSortBy] = useState(SortBy.totalTime);
  const [filterByTypes, setFilterByTypes] = useState(FilterByTypes.all);
  const [filterByStatus, setFilterByStatus] = useState(FilterByStatus.OPEN);
  const [viewBy, setViewBy] = useState(() => ViewBy.list);

  const filteredFacilities = filterFacilitiesByType(filterFacilitiesByStatus(locations, filterByStatus), filterByTypes);
  const sortedCovidTestingLocations = sortFacilities(filteredFacilities, sortBy);

  return (
    <Box className={classes.root}>
      <UserLocation />
      <SupportBanner />
      <LocationsListOptions
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterByTypes={filterByTypes}
        setFilterByTypes={setFilterByTypes}
        filterByStatus={filterByStatus}
        setFilterByStatus={setFilterByStatus}
        viewBy={viewBy}
        setViewBy={setViewBy}
      />
      <Banner
        title="Please note"
        message="Victoria Health no longer reports wait time data for every testing facility. Unfortunately due to the current testing demands and without an official data source for wait times, accurate estimates for every site cannot be provided. Apologies for the inconvenience."
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
