import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SortBy } from './SortBy';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0),
      [theme.breakpoints.up('xs')]: {
        width: '100%',
        marginBottom: '20px',
      },
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(2),
        width: '200px',
        marginBottom: '0px',
      },
    },
  }),
);

export type IFacilitiesSearchOptionsProps = {
  handleSortBy: (sortBy: SortBy) => void;
  sortBy: SortBy;
};

export function LocationsSortOptions({ handleSortBy, sortBy }: IFacilitiesSearchOptionsProps) {
  const classes = useStyles();
  const handleOnSortChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => {
    handleSortBy(event.target.value as SortBy);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl} size="small">
      <InputLabel id="time-select-label">Time</InputLabel>
      <Select id="time-select" labelId="time-select-label" label="Time" value={sortBy} onChange={handleOnSortChange}>
        <MenuItem value={SortBy.all}>All</MenuItem>
        <MenuItem value={SortBy.totalTime}>Quickest overall</MenuItem>
        <MenuItem value={SortBy.distance}>Fastest travel time</MenuItem>
        <MenuItem value={SortBy.waitTime}>Shortest wait time</MenuItem>
      </Select>
    </FormControl>
  );
}
