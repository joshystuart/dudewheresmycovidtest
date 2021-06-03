import React, { useState } from 'react';
import { Grid, Paper, Table, TableBody, TableContainer, TableHead } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ICovidTestingLocation } from '../LocationsDao';
import { LocationSortHelpers, sortFacilities } from './LocationSortHelpers';
import { LocationsSortOptions } from './LocationsSortOptions';
import { useCovidTestingLocations } from '../CovidTestingLocationsContext';
import { LocationsListRow } from './LocationsListRow';
import { LocationsListHead } from './LocationsListHead';
import { LoadingList } from './LoadingList';
import { LocationsListEmptyMessage } from './LocationsListEmptyMessage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {},
  }),
);

export type IFacilitiesListProps = {
  facilities: ICovidTestingLocation[];
};

export function LocationsList({ facilities }: IFacilitiesListProps) {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState(LocationSortHelpers.totalTime);
  const { isLoading } = useCovidTestingLocations();

  if (isLoading) {
    return <LoadingList />;
  }

  if (facilities.length <= 0) {
    return <></>;
  }

  const sortedCovidTestingLocations = sortFacilities(facilities, sortBy);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <LocationsSortOptions sortBy={sortBy} handleSortBy={setSortBy} />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <LocationsListHead sortBy={sortBy} />
            </TableHead>
            {sortedCovidTestingLocations.length > 0 && (
              <TableBody>
                {sortedCovidTestingLocations.map((covidTestingLocation) => {
                  return (
                    <LocationsListRow
                      key={covidTestingLocation.facility.id}
                      sortBy={sortBy}
                      covidTestingLocation={covidTestingLocation}
                    />
                  );
                })}
              </TableBody>
            )}
            {sortedCovidTestingLocations.length === 0 && (
              <TableBody>
                <LocationsListEmptyMessage sortBy={sortBy} />
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
