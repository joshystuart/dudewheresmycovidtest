import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FilterByTypes } from './FilterByTypes';

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
      },
    },
  }),
);

export type ILocationsFilterTypesOptionsProps = {
  handleFilter: (filterBy: FilterByTypes) => void;
  filterByTypes: FilterByTypes;
};

export function LocationsTypesFilterOptions({ handleFilter, filterByTypes }: ILocationsFilterTypesOptionsProps) {
  const classes = useStyles();
  const handleOnSortChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => {
    handleFilter(event.target.value as FilterByTypes);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl} size="small">
      <InputLabel id="filter-select-label">Types</InputLabel>
      <Select
        id="filter-select"
        labelId="filter-select-label"
        label="Types"
        value={filterByTypes}
        onChange={handleOnSortChange}
      >
        <MenuItem value={FilterByTypes.all}>All sites</MenuItem>
        <MenuItem value={FilterByTypes.clinics}>Clinics</MenuItem>
        <MenuItem value={FilterByTypes.driveThrough}>Drive through</MenuItem>
        <MenuItem value={FilterByTypes.hospitals}>Hospitals</MenuItem>
      </Select>
    </FormControl>
  );
}
