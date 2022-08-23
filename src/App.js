import React from "react";
import { Container } from "@material-ui/core";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import PostDetails from './components/PostDetails/PostDetail';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          {/* <Route
            path={["/creators/:name", "/tags/:name"]}
            component={Home}
          /> */}
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
