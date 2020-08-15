import React, { Component } from "react";
import {withRouter}from "react-router-dom"
// import axios from "axios";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    success : "",
    submit : "submit",
    redirect : false
  };
  handleChange = (name) => (e) => {
    this.setState({ [name]: e.target.value});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({submit : "submitting..."})
    const { username, password, email } = this.state;
    const user = { username, password, email };
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signin`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.error){
          return this.setState({error : res.error, submit : "submit",})
        }
        this.setState({success : "Successfully Loggedin.", submit : "submit",})
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="container">
        <div className="col-8 offset-2">
          <form className="border mt-5" onSubmit={(e) => this.handleSubmit(e)}>
            <h2 className="text-center text-white bg-primary py-3">Login</h2>
            <div className="p-3 mt-2">
              <p className={this.state.error ? "text-danger text-center" : "text-success text-center"}>
                {" "}
                {this.state.error ? this.state.error : ""}{this.state.success ? this.state.success : ""} &nbsp;
              </p>
              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="EMAIL"
                  onChange={this.handleChange("email")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="PASSWORD"
                  onChange={this.handleChange("password")}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value={this.state.submit}
                  className="btn btn-block btn-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
