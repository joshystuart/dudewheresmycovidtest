import { Grid, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { SupportButton } from './SupportButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
    paper: {
      color: '#fff',
      backgroundColor: theme.palette.background.default,
      borderRadius: 0,
      boxShadow: 'none',
      padding: theme.spacing(2),
      textAlign: 'center',
    },
  }),
);

export function SupportBanner() {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <SupportButton />
        </Paper>
      </Grid>
    </Grid>
  );
}
