import { Card, CardContent, Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { AppContextProvider } from '../AppContext';
import { Section } from '../components/Section';
import { SupportButton } from '../testing-locations/support/SupportButton';

export function AboutScreen() {
  return (
    <AppContextProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Section>
            <Typography variant="h5" component="h2" align="left">
              About
            </Typography>
          </Section>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                What is Dude Where's My Covid Test
              </Typography>
              <Typography variant="body2" component="p">
                Dude Where's My Covid Test provides a personalised list of the closest covid testing sites in Victoria,
                including wait times, distance to you and an estimated travel time. You can use this information to
                select the quickest testing site based on the combination of travel and wait time.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                How does it work?
              </Typography>
              <Typography variant="body2" component="p">
                The site will ask for your current location and then provide a list of testing facilities ordered by the
                shortest wait time, and the shortest distance from you. Not all testing facilities provide wait times,
                so they will be excluded from the "Quickest overall" list. You can also list testing facilities by
                shortest wait time or shortest distance. The wait times are sourced from{' '}
                <Link href="https://www.dhhs.vic.gov.au/covid-19-testing-sites" target="_blank">
                  https://www.dhhs.vic.gov.au/covid-19-testing-sites
                </Link>{' '}
                and checked for updates every 15 minutes, however we do not know how frequently the wait times are
                updated at each testing site.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Why did you build this?
              </Typography>
              <Typography variant="body2" component="p">
                Like many of you, I needed to get a Covid test, but I didn't want to wait in line for several hours.
                Instead, I spent several hours building a website that would save me, and hopefully many others, time
                waiting around to be tested. As a byproduct, this would help testing facilities spread the load.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                How many people have used this site?
              </Typography>
              <Typography variant="body2" component="p">
                Over the past 7 months over 10,000 people have used this site to find the closest COVID testing facility
                in Victoria. That's a lot of time saved from standing in line!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Section>
                <Typography color="textSecondary" gutterBottom>
                  Can I help?
                </Typography>
                <Typography variant="body2" component="p">
                  YES! This website is costing me roughly $250 - $350 per month for hosting, and after 7 months online,
                  it's starting to really add up! If you find this site useful, and can afford to donate a few bucks,
                  that would help me keep it online.
                </Typography>
              </Section>
              <SupportButton />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Section>
                <Typography color="textSecondary" gutterBottom>
                  Where do you get the data?
                </Typography>
              </Section>
              <Section>
                <Typography color="textSecondary">Victoria</Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  The data I used for this site was sourced from the following official government websites and
                  spreadsheets:
                </Typography>
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
              </Section>
              <Section>
                <Typography color="textSecondary">New South Wales</Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  Unfortunately NSW Health does not provide "wait time" data for testing facilities. This means that I
                  cannot calculate the fastest overall time to get tested.
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  You can get a simple list of testing facilities for NSW here:
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  <Link href="https://nsw.gov.au/covid-19/stay-safe/testing/clinics" target="_blank">
                    https://nsw.gov.au/covid-19/stay-safe/testing/clinics
                  </Link>
                </Typography>
              </Section>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Section>
                <Typography color="textSecondary" gutterBottom>
                  Open source
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  I have open sourced the code for this website and the associated services. Feel free to run this
                  service on your local machine, or if you can afford it, run it on a public server.
                </Typography>
              </Section>
              <Typography color="textSecondary">Github</Typography>
              <Typography variant="body2" component="p">
                <Link href="https://github.com/joshystuart/dudewheresmycovidtest" target="_blank">
                  https://github.com/joshystuart/dudewheresmycovidtest
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AppContextProvider>
  );
}
