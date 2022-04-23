import { Container, Grid, Grow } from "@material-ui/core";
import React from "react";
import Form from "../Form/Form";
import Navbar from "../Navbar/Navbar";
import Posts from "../Posts/Posts";

const Home = () => {
  return (
      <Grow in>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Grow>
  );
};

export default Home;
