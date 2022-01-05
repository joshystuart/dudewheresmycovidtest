import { FormGroup, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React from 'react';
import { Paper } from '../../components/Paper';
import { useCovidTestingLocations } from '../CovidTestingLocationsContext';
import { useUserContext } from '../user/UserContext';
import { FilterByStatus } from './filters/FilterByStatus';
import { FilterByTypes } from './filters/FilterByTypes';
import { LocationsStatusFilterOptions } from './filters/LocationsStatusFilterOptions';
import { LocationsTypesFilterOptions } from './filters/LocationsTypesFilterOptions';
import { LoadingListOptions } from './LoadingListOptions';
import { ViewBy } from './LocationsList';
import { LocationsSortOptions } from './LocationsSortOptions';
import { SortBy } from './SortBy';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formGroup: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    viewBy: {
      marginTop: theme.spacing(2),
    },
  }),
);

export type ILocationsListOptionsProps = {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  filterByTypes: FilterByTypes;
  setFilterByTypes: (filterBy: FilterByTypes) => void;
  filterByStatus: FilterByStatus;
  setFilterByStatus: (filterBy: FilterByStatus) => void;
  viewBy: ViewBy;
  setViewBy: (viewBy: ViewBy) => void;
};

export function LocationsListOptions({
  sortBy,
  setSortBy,
  setFilterByTypes,
  filterByTypes,
  setFilterByStatus,
  filterByStatus,
  viewBy,
  setViewBy,
}: ILocationsListOptionsProps) {
  const classes = useStyles();
  const { isLoading: isLocationsLoading } = useCovidTestingLocations();
  const { isLoading: isUserLoading } = useUserContext();

  if (isLocationsLoading || isUserLoading) {
    return <LoadingListOptions />;
  }

  return (
    <Paper>
      <Typography variant="subtitle1">Show me:</Typography>
      <FormGroup row className={classes.formGroup}>
        <LocationsSortOptions sortBy={sortBy} handleSortBy={setSortBy} />
        <LocationsTypesFilterOptions filterByTypes={filterByTypes} handleFilter={setFilterByTypes} />
        <LocationsStatusFilterOptions filterByStatus={filterByStatus} handleFilter={setFilterByStatus} />
      </FormGroup>
      <ToggleButtonGroup
        className={classes.viewBy}
        value={viewBy}
        onChange={(event, value) => value !== null && setViewBy(value)}
        aria-label="text"
        size="small"
        exclusive
      >
        <ToggleButton value={ViewBy.list}>List view</ToggleButton>
        <ToggleButton value={ViewBy.map}>Map view</ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
}
