import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
  requiresAppointment,
  isClinic,
  isDriveThrough,
  isHospital,
  isOpen,
  isWalkup,
  requiresReferral,
} from '../FacilityHelpers';
import { Facets } from './Facets';
import { ITestingFacility } from '@dwmc-common/testing-facilities';

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
      {isOpen(facility) && <Facets title="Open now" Icon={AccessTimeIcon} />}
      {requiresAppointment(facility) && <Facets title="Requires appointment" Icon={AccessAlarmsIcon} />}
      {requiresReferral(facility) && <Facets title="Requires referral" Icon={AssignmentIcon} />}
    </Grid>
  );
}
