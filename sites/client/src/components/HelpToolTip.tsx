import React from 'react';
import { Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    icon: {},
  }),
);

export function HelpToolTip({ message }: { message: string }) {
  const classes = useStyles();
  return (
    <Tooltip className={classes.root} title={message} aria-label={message}>
      <HelpIcon className={classes.icon} fontSize="small" />
    </Tooltip>
  );
}
