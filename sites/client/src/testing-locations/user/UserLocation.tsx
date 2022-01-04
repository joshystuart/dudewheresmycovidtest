import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { UserAddressAutoComplete } from './UserAddressAutoComplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
  }),
);

export function UserLocation() {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" align="left">
          Avoid long wait times when planning a trip to a COVID testing facility in Victoria
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UserAddressAutoComplete />
      </Grid>
    </Grid>
  );
}
