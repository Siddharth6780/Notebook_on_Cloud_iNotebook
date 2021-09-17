import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import NoteState from "./context/notes/Notestate";
// import Notes from "./components/Notes";
import Alert from "./components/Alert";
import Login from "./components/login";
import Signup from "./components/signup";

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={"This is awesome"} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
