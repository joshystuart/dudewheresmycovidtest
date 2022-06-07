import { Card, CardContent, Grid, Link, Typography } from "@material-ui/core";
import React from "react";

export function ShutdownScreen() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align="left">
          Sorry, we are shutting down.
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Why did you shut this website down?
            </Typography>
            <Typography variant="body2" component="p">
              Unfortunately, this website is costing me roughly $200 per month and after 10 months, it is no longer worth keeping it live. Thanks to everyone who supported the site!
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
              The data I used for this website was sourced from the following official government websites and spreadsheets:
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
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Open source
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              I have open sourced the code for this website and the associated services. Feel free to run this service on your local machine, or if you can afford it, run it on a public server.
            </Typography>
            <Typography color="textSecondary">Github</Typography>
            <Typography variant="body2" component="p">
              <Link
                href="https://github.com/joshystuart/dudewheresmycovidtest"
                target="_blank"
              >
                https://github.com/joshystuart/dudewheresmycovidtest
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
