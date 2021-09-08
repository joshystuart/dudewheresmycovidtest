import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dude Where's My Covid Test
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Search
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
