import React, { Component } from "react";
// import axios from "axios";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: "",
    success : ""
  };
  handleChange = (name) => (e) => {
    this.setState({ [name]: e.target.value , error : ""});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, email } = this.state;
    const user = { username, password, email };
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.error){
          this.setState({error : res.error})
        }
        this.setState({success : res.message})
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="container">
        <div className="col-8 offset-2">
          <form className="border mt-5" onSubmit={(e) => this.handleSubmit(e)}>
            <h2 className="text-center text-white bg-primary py-3">Register</h2>
            <div className="p-3 mt-2">
              <p className={this.state.error ? "text-danger text-center" : "text-success text-center"}>
                {" "}
                {this.state.error ? this.state.error : ""}{this.state.success ? this.state.success : ""} &nbsp;
              </p>
              <div className="form-group">
                <label htmlFor="username">USER NAME</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="USER NAME"
                  onChange={this.handleChange("username")}
                />
              </div>
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
                  value="Submit"
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

export default Signup;
