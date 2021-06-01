import React from 'react';
import {
  Hidden,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ICovidTestingLocation } from './LocationsDao';
import { useSelectedLocation } from './SelectedLocationContext';
import { SortBy, sortFacilities } from './SortBy';
import { getDistanceLabel, getTimeLabel, getTotalTimeLabel } from '../utils/DistanceTimeHelpers';
import { KeyboardArrowDown } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {},
    row: {
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        cursor: 'pointer',
      },
    },
    selected: {
      backgroundColor: theme.palette.success.light,
    },
  }),
);

export type IFacilitiesListProps = {
  facilities: ICovidTestingLocation[];
  sortBy: SortBy;
};

export function LocationsList({ facilities, sortBy }: IFacilitiesListProps) {
  const classes = useStyles();
  const { setSelectedLocation, selectedLocation } = useSelectedLocation();

  if (facilities.length > 0) {
    const sortedFacilities = sortFacilities(facilities, sortBy);

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <Hidden xsDown>
                <TableCell width="380px">Site</TableCell>
                <TableCell align="right">
                  {sortBy === SortBy.distance ? <strong>Distance from you</strong> : <>Distance from you</>}
                </TableCell>
                <TableCell align="right">Travel time</TableCell>
                <TableCell align="right">
                  {sortBy === SortBy.waitTime ? <strong>Wait time</strong> : <>Wait time</>}
                </TableCell>
                <TableCell align="right">
                  {sortBy === SortBy.totalTime ? <strong>Total time</strong> : <>Total time</>}
                </TableCell>
              </Hidden>
              <Hidden smUp>
                <TableCell width="180px">Site</TableCell>
                {sortBy === SortBy.distance && <TableCell align="right">Distance</TableCell>}
                {sortBy === SortBy.waitTime && <TableCell align="right">Wait time</TableCell>}
                {sortBy === SortBy.totalTime && <TableCell align="right">Total time</TableCell>}
              </Hidden>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedFacilities.map(({ distance, travelTime, facility }) => {
              const isSelected = selectedLocation?.facility.id === facility.id;
              const { waitTime } = facility;
              if (facility) {
                return (
                  <TableRow
                    key={facility.id}
                    className={isSelected ? classes.selected : classes.row}
                    onMouseDown={() => setSelectedLocation(facility.id)}
                  >
                    <TableCell component="th" scope="row">
                      {facility.site} - {facility.type}
                    </TableCell>
                    <Hidden xsDown>
                      <TableCell align="right">{getDistanceLabel(distance)}</TableCell>
                      <TableCell align="right">{getTimeLabel(travelTime)}</TableCell>
                      <TableCell align="right">{getTimeLabel(waitTime)}</TableCell>
                      <TableCell align="right">{getTotalTimeLabel(waitTime, travelTime)}</TableCell>
                    </Hidden>
                    <Hidden smUp>
                      {sortBy === SortBy.distance && <TableCell align="right">{getDistanceLabel(distance)}</TableCell>}
                      {sortBy === SortBy.waitTime && <TableCell align="right">{getTimeLabel(waitTime)}</TableCell>}
                      {sortBy === SortBy.totalTime && (
                        <TableCell align="right">{getTotalTimeLabel(waitTime, travelTime)}</TableCell>
                      )}
                    </Hidden>
                  </TableRow>
                );
              }
              return '';
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return <Typography variant="subtitle1">No facilities to display</Typography>;
}
