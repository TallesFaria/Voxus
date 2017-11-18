import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class FormTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: props.task.name,
      description: props.task.description,
      priority: props.task.priority,
      saved: false
    };
    console.log("===========STATE======================");
    console.log(this.state);
    console.log("====================================");

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      taskName: "",
      description: "",
      priority: ""
    });
  }

  renderWarning() {
    if (this.state.saved) {
      return (
        <div>
          <h4>Data Saved</h4>
          <a href="/">List of Tasks</a>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="col-md-6 col-md-offset-3">
          <form name="form" onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                className="form-control"
                name="taskName"
                value={this.state.taskName}
                onChange={this.handleChange}
                placeholder="Task Name"
              />
            </div>
            <div>
              <br />
              <input
                type="text"
                className="form-control"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="description"
              />
            </div>
            <div>
              <br />
              <input
                type="text"
                className="form-control"
                name="priority"
                value={this.state.priority}
                onChange={this.handleChange}
                placeholder="Priority"
              />
            </div>
            <div className="form-group">
              <a href="/">
                <button
                  className="btn btn-primary"
                  onClick={() => this.setState({ saved: true })}
                >
                  Submit
                </button>
              </a>
            </div>
            {this.renderWarning()}
          </form>
        </div>
      </div>
    );
  }
}

export default FormTask;
