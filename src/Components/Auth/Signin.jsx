  import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux"
import {setuser} from "../../redux/store"

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
    this.props.setuser(this.state)
    if(this.props.error){
      this.setState({error: this.props.error})
    }
  };
  render() {
    const { email, password, submit, error, success } = this.state;
    if (this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="col-8 offset-2">
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
      user: state.user,
      error : state.error
  }
}

export default connect(mapStateToProps, {setuser})(Signin);
