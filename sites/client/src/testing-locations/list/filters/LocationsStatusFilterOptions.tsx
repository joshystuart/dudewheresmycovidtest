import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { FilterByStatus } from './FilterByStatus';

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

export type ILocationsFilterTypesOptionsProps = {
  handleFilter: (filterBy: FilterByStatus) => void;
  filterByStatus: FilterByStatus;
};

export function LocationsStatusFilterOptions({ handleFilter, filterByStatus }: ILocationsFilterTypesOptionsProps) {
  const classes = useStyles();
  const handleOnSortChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => {
    handleFilter(event.target.value as FilterByStatus);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl} size="small">
      <InputLabel id="filter-select-status-label">Status</InputLabel>
      <Select
        id="filter-select-status"
        labelId="filter-select-status-label"
        label="Status"
        value={filterByStatus}
        onChange={handleOnSortChange}
      >
        <MenuItem value={FilterByStatus.ALL}>All</MenuItem>
        <MenuItem value={FilterByStatus.OPEN}>Open</MenuItem>
        <MenuItem value={FilterByStatus.CLOSED}>Closed</MenuItem>
        <MenuItem value={FilterByStatus.AT_CAPACITY}>Closed - At capacity</MenuItem>
        <MenuItem value={FilterByStatus.TEMPORARILY_CLOSED}>Closed - Temporarily</MenuItem>
        <MenuItem value={FilterByStatus.UNKNOWN}>Closed - Unknown reason</MenuItem>
      </Select>
    </FormControl>
  );
}
