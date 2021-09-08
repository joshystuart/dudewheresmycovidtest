import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FilterBy } from './FilterBy';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0),
      padding: 0,
      [theme.breakpoints.up('xs')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '200px',
      },
    },
  }),
);

export type ILocationsFilterOptionsProps = {
  handleFilter: (filterBy: FilterBy) => void;
  filterBy: FilterBy;
};

export function LocationsFilterOptions({ handleFilter, filterBy }: ILocationsFilterOptionsProps) {
  const classes = useStyles();
  const handleOnSortChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => {
    handleFilter(event.target.value as FilterBy);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl} size="small">
      <InputLabel id="filter-select-label">Types</InputLabel>
      <Select
        id="filter-select"
        labelId="filter-select-label"
        label="Types"
        value={filterBy}
        onChange={handleOnSortChange}
      >
        <MenuItem value={FilterBy.all}>All sites</MenuItem>
        <MenuItem value={FilterBy.clinics}>Clinics</MenuItem>
        <MenuItem value={FilterBy.driveThrough}>Drive through</MenuItem>
        <MenuItem value={FilterBy.hospitals}>Hospitals</MenuItem>
      </Select>
    </FormControl>
  );
}
