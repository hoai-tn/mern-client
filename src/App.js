import React from "react";
import { Container } from "@material-ui/core";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter, Switch , Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          {/* <Route path="/posts/:id" exact component={PostDetails} /> */}
          {/* <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} /> */}
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
