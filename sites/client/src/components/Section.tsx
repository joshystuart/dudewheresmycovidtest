import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingBottom: 10,
    },
  }),
);

export type ISectionProps = { children: ReactElement[] | ReactElement | string };

export function Section({ children }: ISectionProps) {
  const classes = useStyles();

  return <Box className={classes.root}>{children}</Box>;
}
