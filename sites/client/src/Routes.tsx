import { Container } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Nav } from "./Nav";
import { ShutdownScreen } from "./screens/ShutdownScreen";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '20px',
    },
  }),
);

export function Routes() {
  const classes = useStyles();
  return (
    <Router>
      <Nav />
      <Container className={classes.root} maxWidth="md">
        {/*<Switch>*/}
        {/*  <Route path="/about">*/}
        {/*    <AboutScreen />*/}
        {/*  </Route>*/}
        {/*  <Route path="/">*/}
        {/*    <HomeScreen />*/}
        {/*  </Route>*/}
        {/*</Switch>*/}
        <ShutdownScreen />
      </Container>
    </Router>
  );
}
