import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { UserAddressAutoComplete } from './UserAddressAutoComplete';

export function UserLocation() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="body1" align="left">
          <strong> To see a list of covid testing facilities close to you, please enter your location below:</strong>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UserAddressAutoComplete />
      </Grid>
    </Grid>
  );
}
