import React from 'react';
import { Grid, Table, TableBody, TableContainer, TableHead } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ICovidTestingLocation } from '../LocationsDao';
import { SortBy } from './SortBy';
import { useCovidTestingLocations } from '../CovidTestingLocationsContext';
import { LocationsListRow } from './LocationsListRow';
import { LocationsListHead } from './LocationsListHead';
import { LoadingList } from './LoadingList';
import { LocationsListEmptyMessage } from './LocationsListEmptyMessage';
import { Paper } from '../../components/Paper';
import { useUserContext } from '../user/UserContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    table: {},
  }),
);

export enum ViewBy {
  list = 'list',
  map = 'map',
}

export type IFacilitiesListProps = {
  locations: ICovidTestingLocation[];
  sortBy: SortBy;
};

export function LocationsList({ locations, sortBy }: IFacilitiesListProps) {
  const classes = useStyles();
  const { isLoading: isLocationsLoading } = useCovidTestingLocations();
  const { isLoading: isUserLoading } = useUserContext();

  if (isLocationsLoading || isUserLoading) {
    return <LoadingList />;
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Paper withPadding={false}>
          <TableContainer>
            <Table className={classes.table} stickyHeader aria-label="sticky table">
              <TableHead>
                <LocationsListHead sortBy={sortBy} />
              </TableHead>
              {locations.length > 0 && (
                <TableBody>
                  {locations.map((covidTestingLocation) => {
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
              {locations.length === 0 && (
                <TableBody>
                  <LocationsListEmptyMessage sortBy={sortBy} />
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
