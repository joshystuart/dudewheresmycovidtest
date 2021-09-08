import React from 'react';
import { Backdrop } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      flexDirection: 'column',
    },
  }),
);

export function ErrorOverlay({ title, message, open }: { title: string; message: string; open: boolean }) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Alert severity="error">
        <AlertTitle>Error: {title}</AlertTitle>
        <strong>{message}</strong>
      </Alert>
    </Backdrop>
  );
}
