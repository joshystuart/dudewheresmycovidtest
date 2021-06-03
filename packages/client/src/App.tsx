import React from 'react';
import { Container } from '@material-ui/core';
import { Routes } from './Routes';
import { Nav } from './Nav';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '20px',
    },
  }),
);

export function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Nav />
      <Container className={classes.root} maxWidth={false}>
        <Routes />
      </Container>
    </div>
  );
}
