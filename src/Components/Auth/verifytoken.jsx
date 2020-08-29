import React, { Component } from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

class verifyToken extends Component {
  state = {
    token: "",
    error : null
  };
  componentDidMount() {
    const {token} = queryString.parse(this.props.location.search)
    fetch(
      `https://enigmatic-beach-53552.herokuapp.com/api/v1/auth/verifyToken?token=${token}`
    ).then(res => res.json()).then(res => {
      if(res.error){
        return this.setState({error : res.error})
      }
      return <Redirect to="/signin" />
    })
  }
  render() {
    return (
      <>
      {this.state.error && <p className="alert-danger alert">{this.state.error ? this.state.error : ""}</p>}
      <h1>verifying...</h1></>
    );
  }
}

export default verifyToken;
