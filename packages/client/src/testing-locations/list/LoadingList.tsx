import { Skeleton } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import React from 'react';

export function LoadingList() {
  return (
    <>
      <Skeleton />
      <Typography component="div" variant="h3">
        <Skeleton />
      </Typography>
      <Skeleton />
      <Typography component="div" variant="h3">
        <Skeleton />
      </Typography>
      <Skeleton />
      <Typography component="div" variant="h3">
        <Skeleton />
      </Typography>
      <Skeleton />
    </>
  );
}
