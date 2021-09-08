import React from 'react';
import { FormGroup, Typography } from '@material-ui/core';
import { LocationsSortOptions } from './LocationsSortOptions';
import { LocationsFilterOptions } from './LocationsFilterOptions';
import { Paper } from '../../components/Paper';
import { SortBy } from './SortBy';
import { FilterBy } from './FilterBy';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ViewBy } from './LocationsList';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useCovidTestingLocations } from '../CovidTestingLocationsContext';
import { useUserContext } from '../user/UserContext';
import { LoadingListOptions } from './LoadingListOptions';

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
  filterBy: FilterBy;
  setFilterBy: (filterBy: FilterBy) => void;
  viewBy: ViewBy;
  setViewBy: (viewBy: ViewBy) => void;
};

export function LocationsListOptions({
  sortBy,
  setSortBy,
  setFilterBy,
  filterBy,
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
        <LocationsFilterOptions filterBy={filterBy} handleFilter={setFilterBy} />
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
