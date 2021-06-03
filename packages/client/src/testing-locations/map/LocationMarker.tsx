import { Marker, OverlayView } from '@react-google-maps/api';
import { useState } from 'react';
import { useSelectedLocation } from '../SelectedLocationContext';
import { ICovidTestingLocation } from '../LocationsDao';
import { Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { getTimeLabel } from '../../utils/DistanceTimeHelpers';

export type ILocationMarkerProps = {
  location: ICovidTestingLocation;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overlay: {
      backgroundColor: theme.palette.background.paper,
      padding: '15px',
    },
  }),
);

export const LocationMarker = ({ location: covidTestingLocation }: ILocationMarkerProps) => {
  const classes = useStyles();
  const [isHovered, setIsDisplayedHover] = useState(() => false);
  const { setSelectedLocation, selectedLocation } = useSelectedLocation();

  const onMouseOver = () => {
    setIsDisplayedHover(true);
  };
  const onMouseOut = () => {
    setIsDisplayedHover(false);
  };

  const { id, site, location, waitTime } = covidTestingLocation.facility;

  return (
    <>
      <Marker
        onMouseDown={() => setSelectedLocation(id)}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        title={site}
        position={{ lat: location.latitude, lng: location.longitude }}
      />
      {(isHovered || selectedLocation?.facility.id === id) && (
        <OverlayView
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={{ lat: location.latitude, lng: location.longitude }}
        >
          <Paper elevation={3} className={classes.overlay}>
            <Typography variant="subtitle2">{site}</Typography>
            <Typography variant="body2">Estimated wait time: {getTimeLabel(waitTime)}</Typography>
          </Paper>
        </OverlayView>
      )}
    </>
  );
};
