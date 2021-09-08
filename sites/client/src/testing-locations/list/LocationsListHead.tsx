import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { SortBy } from './SortBy';
import { ListColumnHeading } from './ListColumnHeading';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    cell: {
      minWidth: 85,
    },
  });
});

export type ILocationsListHeadProps = {
  sortBy: SortBy;
};

export function LocationsListHead({ sortBy }: ILocationsListHeadProps) {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell>
        <ListColumnHeading title="Site" justify="flex-start" />
      </TableCell>
      <TableCell align="center" padding="none" className={classes.cell}>
        <ListColumnHeading
          title="Travel time"
          helpText="A rough estimate of the time it would take to travel by car."
          selected={sortBy === SortBy.distance}
        />
      </TableCell>
      <TableCell align="center" padding="none" className={classes.cell}>
        <ListColumnHeading
          title="Wait time"
          helpText="The estimated wait time provided by the testing facility. The wait times are updated frequently during opening hours. If there are no sites in the list below, it's likely that they are all closed."
          selected={sortBy === SortBy.waitTime}
        />
      </TableCell>
      <TableCell align="right">&nbsp;</TableCell>
    </TableRow>
  );
}
