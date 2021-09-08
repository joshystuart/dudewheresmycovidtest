import React, { useEffect, useState } from 'react';
import { Box, Container, IconButton, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSelectedLocation } from '../SelectedLocationContext';
import { LocationDetails } from './LocationDetails';
import { Close } from '@material-ui/icons';
import { Paper } from '../../components/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    close: {
      position: 'absolute',
      right: 0,
    },
    modal: {
      outline: 0,
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
    <Modal open={open} onClose={handleClose} onBackdropClick={handleClose}>
      <Container maxWidth="md" className={classes.modal}>
        <Paper>
          <Box className={classes.root}>
            <IconButton color="secondary" onClick={handleClose} className={classes.close}>
              <Close />
            </IconButton>
            <LocationDetails />
          </Box>
        </Paper>
      </Container>
    </Modal>
  );
}
