import React from 'react';
import { Typography } from '@material-ui/core';
import { useSelectedLocation } from '../SelectedLocationContext';
import { getDistanceLabel, getTimeLabel, getTotalTimeLabel } from '../../utils/DistanceTimeHelpers';

export function LocationDetails() {
  const { selectedLocation } = useSelectedLocation();

  if (selectedLocation) {
    const { facility, travelTime, distance } = selectedLocation;
    const {
      site,
      type,
      location,
      details,
      requirements,
      waitTimeDetails,
      waitTime,
      availability,
      ageLimit,
      phoneNumber,
      website,
    } = facility;

    return (
      <>
        <Typography variant="h6">{site}</Typography>
        <Typography variant="body1">
          {location.address}
          <br />
          {location.suburb}
          <br />
          {location.state}
          <br />
          <br />
        </Typography>
        <Typography variant="body1">{type}</Typography>
        <Typography variant="body1">Estimated distance from you: {getDistanceLabel(distance)}</Typography>
        <Typography variant="body1">Estimated wait time: {getTimeLabel(waitTime)}</Typography>
        <Typography variant="body1">Estimated travel time by car: {getTimeLabel(travelTime)}</Typography>
        <Typography variant="body1">Estimated total time: {getTotalTimeLabel(waitTime, travelTime)}</Typography>
        <Typography variant="body1">
          {waitTimeDetails}
          <br />
          <br />
        </Typography>
        <Typography variant="body1">Availability: {availability}</Typography>
        <Typography variant="body1">Age limit: {ageLimit}</Typography>
        <Typography variant="body1">{details}</Typography>
        <Typography variant="body1">{requirements}</Typography>
        <Typography variant="body1">{phoneNumber}</Typography>
        <Typography variant="body1">
          <br />
          <br />
          <a href={website} target="_blank" rel="noreferrer">
            {website}
          </a>
        </Typography>
      </>
    );
  }

  return <Typography variant="subtitle1">Please select a testing location from the list below</Typography>;
}
