import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import React from 'react';
import { Paper } from '../../components/Paper';

export function LoadingListOptions() {
  return (
    <Paper>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={8}>
          <Skeleton animation="wave" width="100%">
            <div style={{ paddingTop: '25px' }} />
          </Skeleton>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Skeleton animation="wave" width="100%">
            <div style={{ paddingTop: '50px' }} />
          </Skeleton>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Skeleton animation="wave" width="100%">
            <div style={{ paddingTop: '50px' }} />
          </Skeleton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={8}>
          <Skeleton animation="wave" width="100%">
            <div style={{ paddingTop: '35px' }} />
          </Skeleton>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={2} xs={4}>
          <Skeleton animation="wave" width="100%">
            <div style={{ paddingTop: '60px' }} />
          </Skeleton>
        </Grid>
        <Grid item sm={2} xs={4}>
          <Skeleton animation="wave" width="100%">
            <div style={{ paddingTop: '60px' }} />
          </Skeleton>
        </Grid>
      </Grid>
    </Paper>
  );
}
