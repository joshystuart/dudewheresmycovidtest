import React from 'react';
import { Hidden, TableCell, TableRow } from '@material-ui/core';
import { LocationSortHelpers } from './LocationSortHelpers';

export type ILocationsListHeadProps = {
  sortBy: LocationSortHelpers;
};

export function LocationsListHead({ sortBy }: ILocationsListHeadProps) {
  return (
    <TableRow>
      <Hidden xsDown>
        <TableCell width="380px">Site</TableCell>
        <TableCell align="right">
          {sortBy === LocationSortHelpers.distance ? <strong>Distance from you</strong> : <>Distance from you</>}
        </TableCell>
        <TableCell align="right">Travel time</TableCell>
        <TableCell align="right">
          {sortBy === LocationSortHelpers.waitTime ? <strong>Wait time</strong> : <>Wait time</>}
        </TableCell>
        <TableCell align="right">
          {sortBy === LocationSortHelpers.totalTime ? <strong>Total time</strong> : <>Total time</>}
        </TableCell>
      </Hidden>
      <Hidden smUp>
        <TableCell width="180px">Site</TableCell>
        {sortBy === LocationSortHelpers.distance && <TableCell align="right">Distance</TableCell>}
        {sortBy === LocationSortHelpers.waitTime && <TableCell align="right">Wait time </TableCell>}
        {sortBy === LocationSortHelpers.totalTime && <TableCell align="right">Total time</TableCell>}
      </Hidden>
    </TableRow>
  );
}
