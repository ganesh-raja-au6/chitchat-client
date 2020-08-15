import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./Components/Common/Home";
import Navbar from './Components/Common/Navbar'
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/Signin";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;