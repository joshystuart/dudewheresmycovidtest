import React from 'react';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ICovidTestingLocation } from '../LocationsDao';
import { useSelectedLocation } from '../SelectedLocationContext';
import { SortBy } from './SortBy';
import { getTimeLabel } from '../../utils/DistanceTimeHelpers';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { LocationFacets } from './LocationFacets';

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
    titleCell: {
      width: '50%',
      paddingRight: 0,
      [theme.breakpoints.up('sm')]: {
        width: '400px',
      },
      [theme.breakpoints.up('md')]: {
        width: '600px',
      },
    },
  }),
);

export type ILocationsListRowProps = {
  sortBy: SortBy;
  covidTestingLocation: ICovidTestingLocation;
};

export function LocationsListRow({ covidTestingLocation, sortBy }: ILocationsListRowProps) {
  const classes = useStyles();
  const { setSelectedLocation, selectedLocation } = useSelectedLocation();

  const { facility, travelTime } = covidTestingLocation;
  const { currentWaitTime, site, id } = facility;
  const isSelected = selectedLocation?.facility.id === facility.id;

  return (
    <TableRow
      key={id}
      className={isSelected ? classes.selected : classes.row}
      onMouseDown={() => setSelectedLocation(id)}
    >
      <TableCell className={classes.titleCell}>
        <Typography variant="body1" className={classes.title}>
          {site}
        </Typography>
        <LocationFacets facility={facility} />
      </TableCell>
      <TableCell align="center" padding="none">
        {getTimeLabel(travelTime)}
      </TableCell>
      <TableCell align="center" padding="none">
        {getTimeLabel(currentWaitTime)}
      </TableCell>
      <TableCell align="center" padding="none">
        <ChevronRightIcon />
      </TableCell>
    </TableRow>
  );
}
