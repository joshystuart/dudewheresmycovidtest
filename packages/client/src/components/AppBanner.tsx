import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '20px',
    },
    close: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  }),
);

export function AppBanner() {
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = useState(true);
  const handleClose = () => {
    setAlertOpen(false);
  };
  if (alertOpen) {
    return (
      <Alert severity="info">
        <IconButton color="secondary" onClick={handleClose} className={classes.close}>
          <Close />
        </IconButton>
        We currently use your browser location to determine the distance to testing facilities, however this isn't
        accurate for everyone. So we are working on a way to allow you to manually enter your location instead. We will
        hopefully have something up soon. Sorry for the inconvenience.
      </Alert>
    );
  }

  return <></>;
}
