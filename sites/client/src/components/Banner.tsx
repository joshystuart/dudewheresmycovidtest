import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export function Banner({ title, message }: { title: string; message: string }) {
  const classes = useStyles();
  return (
    <Alert severity="warning" className={classes.root}>
      <AlertTitle>{title}</AlertTitle>
      <strong>{message}</strong>
    </Alert>
  );
}
