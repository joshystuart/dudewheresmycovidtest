import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Paper } from '../../components/Paper';

export function LoadingList() {
  return (
    <Paper>
      <Typography component="div" variant="h1">
        <Skeleton animation="wave" />
      </Typography>
      <Skeleton animation="wave" />
      <Typography component="div" variant="h3">
        <Skeleton animation="wave" />
      </Typography>
      <Skeleton animation="wave" />
      <Typography component="div" variant="h3">
        <Skeleton animation="wave" />
      </Typography>
      <Skeleton animation="wave" />
    </Paper>
  );
}
