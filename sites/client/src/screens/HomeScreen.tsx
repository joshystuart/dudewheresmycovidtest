import React from 'react';
import { Grid } from '@material-ui/core';
import { LocationsCard } from '../testing-locations/LocationsCard';
import { AppContextProvider } from '../AppContext';

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
