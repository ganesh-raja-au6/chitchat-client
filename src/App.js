import React from "react";
import { BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom";

import Home from "./Components/Common/Home";
import Navbar from './Components/Common/Navbar'
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/Signin";
import CreatePost from "./Components/Common/createpost";
import verifyToken from "./Components/Auth/verifytoken";

function App() {
  return (
    <>
    <Navbar />
    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/verifyToken" component={verifyToken} />
      <Route path="/signin" component={Signin} />
      <Route path="/createpost" component={CreatePost} />
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
    </>
  );
}

export default App;