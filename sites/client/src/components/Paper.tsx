import React, { ReactElement } from 'react';
import { Paper as MuiPaper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      color: theme.palette.text.secondary,
      borderRadius: 0,
    },
    withPadding: {
      color: theme.palette.text.secondary,
      borderRadius: 0,
      padding: theme.spacing(2),
    },
  }),
);

export type IPaperProps = { children: ReactElement[] | ReactElement | string; withPadding?: boolean };

export function Paper({ children, withPadding = true }: IPaperProps) {
  const classes = useStyles();

  return <MuiPaper className={withPadding ? classes.withPadding : classes.paper}>{children}</MuiPaper>;
}
