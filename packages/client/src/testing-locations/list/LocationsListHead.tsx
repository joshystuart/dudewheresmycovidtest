import React from 'react';
import { Hidden, TableCell, TableRow } from '@material-ui/core';
import { SortBy } from './SortBy';

export type ILocationsListHeadProps = {
  sortBy: SortBy;
};

export function LocationsListHead({ sortBy }: ILocationsListHeadProps) {
  return (
    <TableRow>
      <Hidden xsDown>
        <TableCell width="380px">Site</TableCell>
        <TableCell align="right">
          {sortBy === SortBy.distance ? <strong>Distance from you</strong> : <>Distance from you</>}
        </TableCell>
        <TableCell align="right">Travel time</TableCell>
        <TableCell align="right">{sortBy === SortBy.waitTime ? <strong>Wait time</strong> : <>Wait time</>}</TableCell>
        <TableCell align="right">
          {sortBy === SortBy.totalTime ? <strong>Total time</strong> : <>Total time</>}
        </TableCell>
      </Hidden>
      <Hidden smUp>
        <TableCell width="180px">Site</TableCell>
        {sortBy === SortBy.distance && <TableCell align="right">Distance</TableCell>}
        {sortBy === SortBy.waitTime && <TableCell align="right">Wait time </TableCell>}
        {sortBy === SortBy.totalTime && <TableCell align="right">Total time</TableCell>}
      </Hidden>
    </TableRow>
  );
}
