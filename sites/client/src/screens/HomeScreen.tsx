import { Grid } from '@material-ui/core';
import React from 'react';
import { AppContextProvider } from '../AppContext';
import { LocationsCard } from '../testing-locations/LocationsCard';

export function HomeScreen() {
  return (
    <AppContextProvider>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <LocationsCard />
        </Grid>
      </Grid>
    </AppContextProvider>
  );
}
