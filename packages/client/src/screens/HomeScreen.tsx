import React from 'react';
import { Grid, Hidden, Paper } from '@material-ui/core';
import { LocationsCard } from '../testing-locations/LocationsCard';
import { LocationDetails } from '../testing-locations/details/LocationDetails';
import { LocationDetailsModal } from '../testing-locations/details/LocationDetailsModal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppContextProvider } from '../AppContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }),
);

export function HomeScreen() {
  const classes = useStyles();

  return (
    <AppContextProvider>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <LocationsCard />
        </Grid>
        <Hidden xsDown>
          <Grid item md={6} xs={12}>
            <Paper className={classes.details}>
              <LocationDetails />
            </Paper>
          </Grid>
        </Hidden>
        <Hidden smUp>
          <LocationDetailsModal />
        </Hidden>
      </Grid>
    </AppContextProvider>
  );
}
