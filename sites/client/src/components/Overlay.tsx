import React, { ReactElement } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'relative',
    },
    overlay: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: 'rgba(255,255,255,0.7)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
    },
  }),
);

export function Overlay({ children, show }: { children: ReactElement[] | ReactElement | string; show: boolean }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {children}
      {show && (
        <Box className={classes.overlay}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
}
