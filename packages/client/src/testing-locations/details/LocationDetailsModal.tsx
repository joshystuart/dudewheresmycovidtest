import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Modal, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSelectedLocation } from '../SelectedLocationContext';
import { LocationDetails } from './LocationDetails';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    close: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  }),
);

export function LocationDetailsModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { selectedLocation, setSelectedLocation } = useSelectedLocation();

  useEffect(() => {
    if (selectedLocation && !open) {
      setOpen(true);
    }
  }, [selectedLocation, open]);

  const handleClose = () => {
    setOpen(false);
    setSelectedLocation(undefined);
  };

  return (
    <Grid item xs={12}>
      <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
        <Paper className={classes.root}>
          <IconButton color="secondary" onClick={handleClose} className={classes.close}>
            <Close />
          </IconButton>
          <LocationDetails />
        </Paper>
      </Modal>
    </Grid>
  );
}
