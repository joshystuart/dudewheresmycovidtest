import React from 'react';
import { Grid } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SortBy } from './SortBy';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
    },
    button: {
      // TODO update button color
      // color: theme.palette.secondary.main,
    },
  }),
);

export type IFacilitiesSearchOptionsProps = {
  handleSortBy: (sortBy: SortBy) => void;
  sortBy: SortBy;
};

export function LocationsSortOptions({ handleSortBy, sortBy }: IFacilitiesSearchOptionsProps) {
  const classes = useStyles();
  const handleOnChange = (event: React.MouseEvent<HTMLElement>, value: SortBy) => {
    handleSortBy(value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.root}>
        <ToggleButtonGroup value={sortBy} exclusive onChange={handleOnChange} aria-label="text alignment">
          <ToggleButton className={classes.button} value={SortBy.distance} aria-label="left aligned" color="#eee">
            Distance
          </ToggleButton>
          <ToggleButton className={classes.button} value={SortBy.waitTime} aria-label="centered">
            Wait Time
          </ToggleButton>
          <ToggleButton className={classes.button} value={SortBy.totalTime} aria-label="right aligned">
            Total Time
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
}
