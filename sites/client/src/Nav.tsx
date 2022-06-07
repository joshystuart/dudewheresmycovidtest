import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      '&:visited': {
        color: 'inherit',
        textDecoration: 'none',
      },
    },
  }),
);

export function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" className={classes.title}>
            Dude Where's My Covid Test
          </Typography>
          {/*<Box className={classes.menuButton}>*/}
          {/*  <Button color="secondary" variant="contained" component={Link} to="/">*/}
          {/*    Search*/}
          {/*  </Button>*/}
          {/*  <Button color="secondary" variant="contained" component={Link} to="/about">*/}
          {/*    About*/}
          {/*  </Button>*/}
          {/*</Box>*/}
        </Toolbar>
      </AppBar>
    </div>
  );
}
