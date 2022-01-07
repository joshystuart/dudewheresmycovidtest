import { ITestingFacility } from '@dwmc-common/testing-facilities';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';
import {
  isAtCapacity,
  isClinic,
  isClosed,
  isClosedPermanently,
  isDriveThrough,
  isHospital,
  isOpen,
  isWalkup,
  requiresAppointment,
  requiresReferral,
} from '../FacilityHelpers';
import { Facets } from './Facets';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1),
    },
  }),
);

export type ILocationFacets = {
  facility: ITestingFacility;
};

export function LocationFacets({ facility }: ILocationFacets) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={1}>
      {isDriveThrough(facility) && <Facets title="Drive through" Icon={DriveEtaIcon} />}
      {isHospital(facility) && <Facets title="Hospital" Icon={LocalHospitalIcon} />}
      {isWalkup(facility) && <Facets title="Walk up" Icon={DirectionsWalkIcon} />}
      {isClinic(facility) && <Facets title="Clinic" Icon={EnhancedEncryptionIcon} />}
      {isOpen(facility) && <Facets title="Open now" Icon={AccessTimeIcon} iconColor="secondary" />}
      {isClosed(facility) && <Facets title="Closed" Icon={AlarmOffIcon} />}
      {isClosedPermanently(facility) && <Facets title="Closed - Permanently" Icon={AlarmOffIcon} iconColor="error" />}
      {isAtCapacity(facility) && <Facets title="Closed - At capacity" Icon={WarningIcon} iconColor="error" />}
      {requiresAppointment(facility) && <Facets title="Requires appointment" Icon={AccessAlarmsIcon} />}
      {requiresReferral(facility) && <Facets title="Requires referral" Icon={AssignmentIcon} />}
    </Grid>
  );
}
