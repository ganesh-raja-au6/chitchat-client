import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    submit: "Submit",
    success: false,
  };
  handleChange = (name) => (e) => {
    this.setState({ error: "" });
    this.setState({ [name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submit: "submitting..." });
    const { password, email } = this.state;
    const user = { password, email };
    this.signup(user).then((data) => {
      if (data.error) {
        this.setState({ submit: "Submit", password: "" });
        this.setState({ error: data.error });
      } else {
        this.setState({ submit: "Submit", success: true });
        if (typeof window !== "undefined") {
          localStorage.setItem("chit-chat-auth", JSON.stringify(data));
        }
      }
    });
  };
  signup = (user) => {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  form = (email, password, success, error, submit) => {
    return (
      <form className="mt-5 border" onSubmit={(e) => this.handleSubmit(e)}>
        <h2 className="text-center text-white bg-primary py-3">Login</h2>
        <div className="p-3 mt-2">
          <p
            className={
              success ? "text-success text-center" : "text-danger text-center"
            }
          >
            {" "}
            {error ? error : ""} &nbsp;{" "}
          </p>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              required
              min="4"
              max="25"
              name="email"
              onChange={this.handleChange("email")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              required
              min="8"
              max="25"
              name="password"
              onChange={this.handleChange("password")}
            />
          </div>
          <div className="form-group">
            <input type="submit" value={submit} className="btn btn-primary" />
          </div>
        </div>
      </form>
    );
  };
  render() {
    const { email, password, submit, error, success } = this.state;
    if (success) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="col-8 offset-2">
          {this.form(email, password, success, error, submit)}
        </div>
      </div>
    );
  }
}

export default Signin;
