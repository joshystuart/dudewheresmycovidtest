import { Box, Container, Dialog, IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Paper } from '../../components/Paper';
import { useSelectedLocation } from '../SelectedLocationContext';
import { LocationDetails } from './LocationDetails';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      position: 'relative',
      outline: 0,
      paddingBottom: 50,
    },
    close: {
      position: 'absolute',
      right: 25,
    },
    container: {},
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
    <Dialog open={open} onClose={handleClose} fullScreen>
      <Container maxWidth="md" className={classes.modal}>
        <Paper>
          <Box className={classes.container}>
            <IconButton color="secondary" onClick={handleClose} className={classes.close}>
              <Close />
            </IconButton>
            <LocationDetails />
          </Box>
        </Paper>
      </Container>
    </Dialog>
  );
}
