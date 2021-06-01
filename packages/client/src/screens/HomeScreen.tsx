import React from 'react';
import { useGeolocation } from '../geolocation/useGeolocation';
import { Grid, Hidden, Paper } from '@material-ui/core';
import { FacilitiesContextProvider, LocationsContextConsumer } from '../testing-locations/LocationsContext';
import { LocationsCard } from '../testing-locations/LocationsCard';
import { LocationDetails } from '../testing-locations/LocationDetails';
import { LocationDetailsModal } from '../testing-locations/LocationDetailsModal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Overlay } from '../utils/Overlay';
import { ErrorOverlay } from '../utils/ErrorOverlay';

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
  const { latitude, longitude, isLoading } = useGeolocation();

  if (!isLoading && latitude && longitude) {
    return (
      <FacilitiesContextProvider latitude={latitude} longitude={longitude}>
        <LocationsContextConsumer>
          {({ locations, error }) => {
            if (typeof locations === 'undefined' && typeof error === 'undefined') {
              return <Overlay message="Please wait, loading covid testing locations..." open={true} />;
            } else if (typeof locations === 'undefined' && typeof error !== 'undefined') {
              return (
                <ErrorOverlay title="Failed to retrieve covid testing locations" message={error.message} open={true} />
              );
            }

            return (
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
            );
          }}
        </LocationsContextConsumer>
      </FacilitiesContextProvider>
    );
  }

  return <></>;
}
