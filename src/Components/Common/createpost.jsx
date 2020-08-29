import React, { Component } from "react";
import axios from "axios";

class CreatePost extends Component {
  state = {
    username: "",
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
    const { username, email, password, submit, error, success } = this.state;
    fetch("https://enigmatic-beach-53552.herokuapp.com/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          this.setState({ error: res.error });
          return;
        }
        this.setState({ success: true }, () => {
          if (this.state.success) {
            this.setState({
              error:
                "A verification email has been sent to your email id kindly verify it.",
            });
          }
        });
      })
      .catch((err) => {
        if (err) {
          this.setState({ error: err });
        }
      });
  };
  render() {
    const { username, email, password, submit, error, success } = this.state;
    return (
      <div className="container">
        <div className="col-8 offset-2">
          <form className="mt-5 border" onSubmit={(e) => this.handleSubmit(e)}>
            <h2 className="text-center text-white bg-primary py-3">Register</h2>
            <div className="p-3 mt-2">
              <p
                className={
                  success
                    ? "text-success text-center"
                    : "text-danger text-center"
                }
              >
                {" "}
                {error ? error : ""} &nbsp;{" "}
              </p>
              <div className="form-group">
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  value={username}
                  required
                  min="4"
                  max="25"
                  name="username"
                  onChange={this.handleChange("username")}
                />
              </div>
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
                <input
                  type="submit"
                  value={submit}
                  onClick={this.handleSubmit}
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreatePost;
