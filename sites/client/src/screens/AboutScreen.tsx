import React from 'react';
import { Card, CardContent, Grid, Link, Typography } from '@material-ui/core';
import { AppContextProvider } from '../AppContext';

export function AboutScreen() {
  return (
    <AppContextProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align="left">
            About
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Why did you build this?
              </Typography>
              <Typography variant="body2" component="p">
                Like many of you, I needed to go and get a Covid test, but I didn't want to wait in line for several
                hours. Instead, I spent several hours building a website that would save me, and hopefully many others,
                wasted time waiting around to be tested. As a byproduct, this would also help testing facilities as the
                load would hopefully be spread across more facilities.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Where do you get the data?
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                The data is sourced from the following official government websites and spreadsheets:
              </Typography>
              <Typography color="textSecondary">Victoria</Typography>
              <Typography variant="body2" component="p">
                <Link
                  href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSB6eO4MpNciq3U2Iq6vtkAyFxJx0Cz77g-4QFLK3baL2LMUhWG50XrpuTWtnEpsmKQR1wXPPVPIQv3/pub?gid=460623049&single=true"
                  target="_blank"
                >
                  Google doc
                </Link>
              </Typography>
              <Typography variant="body2" component="p" gutterBottom>
                <Link href="https://www.dhhs.vic.gov.au/covid-19-testing-sites" target="_blank">
                  https://www.dhhs.vic.gov.au/covid-19-testing-sites
                </Link>
              </Typography>
              <Typography color="textSecondary">New South Wales</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AppContextProvider>
  );
}
