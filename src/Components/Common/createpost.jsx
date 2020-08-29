import React, { Component } from "react";
import axios from "axios";

class CreatePost extends Component {
  state = {
    title: "",
    description: "",
    error: "",
    submit: "Submit",
    success: false,
  };
  handleChange = (name) => (e) => {
    this.setState({ error: "" });
    this.setState({ [name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    try{
        this.setState({ submit: "submitting..." });
        const { title, description, submit, error, success } = this.state;
        const {data} = await axios.post(`https://enigmatic-beach-53552.herokuapp.com/api/v1/post`)
        console.log('data',data)
    }catch(err){
        console.log('err', err)
    }
    // fetch("https://enigmatic-beach-53552.herokuapp.com/api/v1/post/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json","Authorization" : "Bearer " + JSON.parse(localStorage.getItem('test')).token },
    //   body: JSON.stringify({
    //     title,
    //     body : description,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.error) {
    //       this.setState({ error: res.error });
    //       return;
    //     }
    //     this.setState({ success: true, submit }, () => {
    //       if (this.state.success) {
    //         this.setState({
    //           error: "post created successfully.",
    //         });
    //       }
    //     });
    //   })
    //   .catch((err) => {
    //     if (err) {
    //       this.setState({ error: err.error });
    //     }
    //   });
  };
  render() {
    const { title, description, submit, error, success } = this.state;
    return (
      <div className="container">
        <div className="col-8 offset-2">
          <form className="mt-5 border" onSubmit={(e) => this.handleSubmit(e)}>
            <h2 className="text-center text-white bg-primary py-3">
              CREATE POST
            </h2>
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
                <label htmlFor="username">title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="add a title"
                  value={title}
                  required
                  min="4"
                  max="25"
                  name="title"
                  onChange={this.handleChange("title")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">body</label>
                <textarea
                  name="description"
                  onChange={this.handleChange("description")}
                  id=""
                  cols="30"
                  rows="10"
                  min="10"
                  max="100"
                  value={description}
                  className="form-control"
                >
                  add a description
                </textarea>
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
