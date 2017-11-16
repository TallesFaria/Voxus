import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../actions";

class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: "",
      description: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // this.setState({ submitted: true });
    const { taskName, description } = this.state;
    if (taskName || description) {
      this.props.createTask(this.state);
    }
  }
  
  render() {
    return (
      <div>
        <div className="col-md-6 col-md-offset-3">
          <h2>New Task</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            <div>
              {/* <label htmlFor="taskName">Task name</label> */}
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
              {/* <label htmlFor="description">Task description</label> */}
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
            <div className="form-group">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { createTask })(CreateTask);
