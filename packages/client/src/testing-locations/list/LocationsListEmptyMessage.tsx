import React from 'react';
import { Hidden, TableCell, TableRow } from '@material-ui/core';
import { LocationSortHelpers } from './LocationSortHelpers';
import { Alert } from '@material-ui/lab';

export type ILocationsListEmptyMessageProps = {
  sortBy: LocationSortHelpers;
};

export function LocationsListEmptyMessage({ sortBy }: ILocationsListEmptyMessageProps) {
  const title = 'Sorry there are no testing facilities to display.';
  const waitTimeMessage = 'This could be because no sites are currently open or listing wait times.';
  return (
    <TableRow>
      <Hidden xsDown>
        <TableCell colSpan={5}>
          <Alert severity="info">
            {title}
            {sortBy !== LocationSortHelpers.distance && <div>{waitTimeMessage}</div>}
          </Alert>
        </TableCell>
      </Hidden>
      <Hidden smUp>
        <TableCell colSpan={3}>
          <Alert severity="info">
            {title}
            {sortBy !== LocationSortHelpers.distance && <div>{waitTimeMessage}</div>}
          </Alert>
        </TableCell>
      </Hidden>
    </TableRow>
  );
}
