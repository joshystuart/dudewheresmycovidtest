import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

export function FullScreenOverlay({ message, open }: { message: string; open: boolean }) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <>
        <CircularProgress color="inherit" />
        <Typography variant="h6">{message}</Typography>
      </>
    </Backdrop>
  );
}
