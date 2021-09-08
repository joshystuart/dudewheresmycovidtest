import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSelectedLocation } from '../SelectedLocationContext';
import RoomIcon from '@material-ui/icons/Room';
import { IconText } from './IconText';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import {
  isClinic,
  isDriveThrough,
  isHospital,
  isOpen,
  isWalkup,
  requiresAppointment,
  requiresReferral,
} from '../FacilityHelpers';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ComputerIcon from '@material-ui/icons/Computer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoIcon from '@material-ui/icons/Info';
import { FacilityMapView } from './FacilityMapView';
import { ITestingFacility } from '@dwmc-common/testing-facilities';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    streetView: {
      [theme.breakpoints.up('md')]: {
        padding: `0px ${theme.spacing(8)}px ${theme.spacing(1)}px !important`,
      },
    },
  }),
);

function getGoogleMapsLink(facility: ITestingFacility) {
  const { location } = facility;
  const { address, state, suburb } = location;
  const fullAddress = `${address}, ${suburb}, ${state}`;
  return `https://www.google.com/maps/place/${encodeURIComponent(fullAddress)}`;
}

export function LocationDetails() {
  const classes = useStyles();
  const { selectedLocation } = useSelectedLocation();

  if (selectedLocation) {
    const { facility } = selectedLocation;
    const { site, location, availability, ageLimit, phoneNumber, website } = facility;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">{site}</Typography>
        </Grid>
        <Grid item xs={12}>
          <IconText
            title={`${location.address}, ${location.suburb}`}
            link={getGoogleMapsLink(facility)}
            Icon={RoomIcon}
          />
          {phoneNumber && <IconText title={phoneNumber} Icon={PhoneAndroidIcon} />}
          {website && <IconText title={website} link={website} Icon={ComputerIcon} />}
        </Grid>

        <Grid item xs={12} className={classes.streetView}>
          {/*<FacilityStreetView facility={facility} />*/}
          <FacilityMapView facility={facility} />
        </Grid>

        <Grid item xs={12}>
          {isDriveThrough(facility) && <IconText title="Drive through" Icon={DriveEtaIcon} />}
          {isHospital(facility) && <IconText title="Hospital" Icon={LocalHospitalIcon} />}
          {isWalkup(facility) && <IconText title="Walk up" Icon={DirectionsWalkIcon} />}
          {isClinic(facility) && <IconText title="Clinic" Icon={EnhancedEncryptionIcon} />}
          {isOpen(facility) && <IconText title="Open now" Icon={AccessTimeIcon} />}
          {requiresAppointment(facility) && <IconText title="Requires appointment" Icon={AccessAlarmsIcon} />}
          {requiresReferral(facility) && <IconText title="Requires referral" Icon={AssignmentIcon} />}
          {availability && <IconText title={availability} Icon={AccessTimeIcon} />}
          {ageLimit && <IconText title={ageLimit} Icon={InfoIcon} />}
        </Grid>
      </Grid>
    );
  }

  return <Typography variant="subtitle1">Please select a testing location from the list below</Typography>;
}
