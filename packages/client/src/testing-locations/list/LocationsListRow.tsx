import React from 'react';
import { Hidden, TableCell, TableRow, Tooltip, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ICovidTestingLocation } from '../LocationsDao';
import { useSelectedLocation } from '../SelectedLocationContext';
import { SortBy } from './SortBy';
import { getDistanceLabel, getTimeLabel, getTotalTimeLabel } from '../../utils/DistanceTimeHelpers';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    title: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  }),
);

// TODO Add a row of icons for things that might effect the relevancy for me:
// - walk in
// - drive through
// - open / close
// - appointment
export function getFacilityTypeIcon(type: string): JSX.Element | undefined {
  console.log(type);
  switch (type) {
    case 'Drive-through Testing Facility':
      return (
        <Tooltip title={type}>
          <DriveEtaIcon fontSize="small" />
        </Tooltip>
      );
    case 'Walk-through Testing Facility':
      return (
        <Tooltip title={type}>
          <DirectionsWalkIcon fontSize="small" />
        </Tooltip>
      );
  }
}

export type ILocationsListRowProps = {
  sortBy: SortBy;
  covidTestingLocation: ICovidTestingLocation;
};

export function LocationsListRow({ covidTestingLocation, sortBy }: ILocationsListRowProps) {
  const classes = useStyles();
  const { setSelectedLocation, selectedLocation } = useSelectedLocation();

  const { facility, distance, travelTime } = covidTestingLocation;
  const { waitTime, site, id } = facility;
  const isSelected = selectedLocation?.facility.id === facility.id;

  return (
    <TableRow
      key={id}
      className={isSelected ? classes.selected : classes.row}
      onMouseDown={() => setSelectedLocation(id)}
    >
      <TableCell component="th" scope="row">
        <Typography variant="body2" className={classes.title}>
          {site}
        </Typography>
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
        {sortBy === SortBy.totalTime && <TableCell align="right">{getTotalTimeLabel(waitTime, travelTime)}</TableCell>}
      </Hidden>
    </TableRow>
  );
}
